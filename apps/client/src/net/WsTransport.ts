/**
 * Multiplayer-Transport über WebSocket. JSON für Nachrichten, Binär-Frames für Chunks.
 */
import {
  decodeFrame,
  PROTOCOL_VERSION,
  type AnyClientMessage,
  type AnyServerEvent,
  type ClientMessage,
  type ServerEvent,
  type Transport,
} from '@blockcraft/shared';
import { serverUrl } from '../config/env';

export interface BinaryFrame {
  type: number;
  cx: number;
  cz: number;
  data: Uint8Array;
}

/** Weckt den Server (Render Free schläft nach Inaktivität). Ruft `onStatus` mit Hinweisen auf. */
export async function wakeServer(onStatus: (text: string) => void, timeoutMs = 90_000): Promise<void> {
  const t0 = Date.now();
  let first = true;
  while (Date.now() - t0 < timeoutMs) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      const res = await fetch(serverUrl('/health'), { signal: ctrl.signal, cache: 'no-store' });
      clearTimeout(timer);
      if (res.ok) return;
    } catch {
      // Server schläft noch oder ist nicht erreichbar
    }
    if (first) onStatus('Server startet … (das kann beim ersten Mal bis zu einer Minute dauern)');
    first = false;
    await new Promise((r) => setTimeout(r, 2500));
  }
  throw new Error('Der Server ist nicht erreichbar. Bitte später erneut versuchen.');
}

export function wsUrl(): string {
  const http = serverUrl('/ws');
  return http.replace(/^http/, 'ws');
}

export class WsTransport implements Transport {
  readonly sharesWorld = false;
  private readonly listeners = new Set<(ev: AnyServerEvent) => void>();
  private readonly binaryListeners = new Set<(f: BinaryFrame) => void>();
  private readonly closeListeners = new Set<(reason: string) => void>();
  private closedByUs = false;

  private constructor(private readonly ws: WebSocket) {
    ws.binaryType = 'arraybuffer';
    ws.onmessage = (e: MessageEvent) => {
      if (typeof e.data === 'string') {
        let ev: AnyServerEvent;
        try {
          ev = JSON.parse(e.data) as AnyServerEvent;
        } catch {
          return;
        }
        for (const l of [...this.listeners]) l(ev);
      } else {
        const f = decodeFrame(new Uint8Array(e.data as ArrayBuffer));
        if (f) for (const l of [...this.binaryListeners]) l(f);
      }
    };
    ws.onclose = (e: CloseEvent) => {
      const reason = this.closedByUs ? '' : e.reason || 'Verbindung zum Server getrennt.';
      for (const l of [...this.closeListeners]) l(reason);
    };
  }

  /** Verbindet, wartet auf die Begrüssung des Servers und meldet sich mit Namen an. */
  static connect(name: string, url = wsUrl(), timeoutMs = 15_000): Promise<WsTransport> {
    return new Promise((resolve, reject) => {
      let ws: WebSocket;
      try {
        ws = new WebSocket(url);
      } catch (e) {
        reject(e);
        return;
      }
      const timer = setTimeout(() => {
        ws.close();
        reject(new Error('Zeitüberschreitung beim Verbinden.'));
      }, timeoutMs);
      ws.onerror = () => {
        clearTimeout(timer);
        reject(new Error('Verbindung zum Server fehlgeschlagen.'));
      };
      ws.onmessage = (e: MessageEvent) => {
        if (typeof e.data !== 'string') return;
        try {
          const ev = JSON.parse(e.data) as AnyServerEvent;
          if (ev.t !== 'hello') return;
          clearTimeout(timer);
          if (ev.protocol !== PROTOCOL_VERSION) {
            ws.close();
            reject(new Error('Die Spielversion passt nicht zum Server. Bitte die Seite neu laden.'));
            return;
          }
          const t = new WsTransport(ws);
          t.sendAny({ t: 'hello', version: PROTOCOL_VERSION, name });
          resolve(t);
        } catch {
          // ignorieren
        }
      };
    });
  }

  send(msg: ClientMessage): void {
    this.sendAny(msg);
  }

  sendAny(msg: AnyClientMessage): void {
    if (this.ws.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify(msg));
  }

  sendBinary(data: Uint8Array): void {
    if (this.ws.readyState === WebSocket.OPEN) this.ws.send(data);
  }

  /** Ausstehende Bytes (für gedrosseltes Hochladen). */
  get buffered(): number {
    return this.ws.bufferedAmount;
  }

  get open(): boolean {
    return this.ws.readyState === WebSocket.OPEN;
  }

  onEvent(listener: (ev: ServerEvent) => void): () => void {
    return this.onAny(listener as (ev: AnyServerEvent) => void);
  }

  onAny(listener: (ev: AnyServerEvent) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  onBinary(listener: (f: BinaryFrame) => void): () => void {
    this.binaryListeners.add(listener);
    return () => this.binaryListeners.delete(listener);
  }

  onClose(listener: (reason: string) => void): () => void {
    this.closeListeners.add(listener);
    return () => this.closeListeners.delete(listener);
  }

  /** Wartet auf ein bestimmtes Ereignis (oder einen Fehler vom Server). */
  waitFor<T extends AnyServerEvent['t']>(t: T, timeoutMs = 20_000): Promise<Extract<AnyServerEvent, { t: T }>> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        off();
        reject(new Error('Der Server antwortet nicht.'));
      }, timeoutMs);
      const off = this.onAny((ev) => {
        if (ev.t === t) {
          clearTimeout(timer);
          off();
          resolve(ev as Extract<AnyServerEvent, { t: T }>);
        } else if (ev.t === 'error') {
          clearTimeout(timer);
          off();
          reject(new Error(ev.message));
        }
      });
    });
  }

  close(): void {
    this.closedByUs = true;
    this.ws.close(1000, 'Client beendet');
  }
}
