/** Verbindungs-Protokoll eines WebSocket-Clients: Handshake, Raum erstellen/beitreten, Spielnachrichten. */
import type { WebSocket } from 'ws';
import {
  decodeFrame,
  Frame,
  GAME_NAME,
  GAME_VERSION,
  isValidRoomCode,
  normalizeRoomCode,
  PROTOCOL_VERSION,
  type AnyClientMessage,
  type AnyServerEvent,
  type ClientMessage,
  type LobbyErrorCode,
  stripControlChars,
} from '@blockcraft/shared';
import type { Logger } from '../log';
import type { Conn, Room } from './Room';
import type { RoomManager } from './RoomManager';

const GAME_MESSAGES = new Set([
  'setBlock',
  'startBreak',
  'breakBlock',
  'placeBlock',
  'useBlock',
  'openInventory',
  'closeWindow',
  'windowClick',
  'windowSwap',
  'creativePick',
  'pickBlock',
  'selectSlot',
  'eat',
  'drop',
  'respawn',
  'setMode',
  'playerState',
]);

const MAX_UPLOAD_CHUNKS = 5000;

export function handleConnection(ws: WebSocket, ip: string, manager: RoomManager, log: Logger, dayLengthTicks: number): void {
  let name = '';
  let helloOk = false;
  let room: Room | null = null;
  let playerId: number | null = null;
  let pendingRoom: Room | null = null; // erstellt, wartet auf Upload
  let uploads = 0;

  const conn: Conn = {
    send: (ev: AnyServerEvent) => {
      if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(ev));
    },
    sendBinary: (data: Uint8Array) => {
      if (ws.readyState === ws.OPEN) ws.send(data, { binary: true });
    },
    close: (code, reason) => ws.close(code, reason),
    get buffered() {
      return ws.bufferedAmount;
    },
  };

  conn.send({ t: 'hello', name: GAME_NAME, version: GAME_VERSION, protocol: PROTOCOL_VERSION });

  const fail = (code: LobbyErrorCode, message: string): void => {
    conn.send({ t: 'error', code, message });
  };

  ws.on('message', (data, isBinary) => {
    try {
      if (isBinary) {
        const buf = data instanceof Buffer ? new Uint8Array(data.buffer, data.byteOffset, data.byteLength) : new Uint8Array(data as ArrayBuffer);
        const f = decodeFrame(buf);
        if (f && f.type === Frame.Upload && pendingRoom && uploads < MAX_UPLOAD_CHUNKS && f.data.byteLength < 512 * 1024) {
          pendingRoom.addUpload(f.cx, f.cz, f.data);
          uploads++;
        }
        return;
      }
      const msg = JSON.parse(String(data)) as AnyClientMessage;
      if (!msg || typeof msg !== 'object' || typeof msg.t !== 'string') return;

      if (msg.t === 'hello') {
        if (msg.version !== PROTOCOL_VERSION) {
          fail('version', 'Spielversion passt nicht zum Server – bitte die Seite neu laden.');
          return;
        }
        name = stripControlChars(String(msg.name ?? '')).trim().slice(0, 20);
        helloOk = true;
        return;
      }
      if (!helloOk) return;

      if (msg.t === 'createRoom') {
        if (room || pendingRoom) return;
        if (!manager.joinLimiter.allow(ip)) return fail('rate_limited', 'Zu viele Versuche – bitte kurz warten.');
        if (!manager.canCreate()) return fail('too_many_rooms', 'Der Server ist gerade voll. Bitte später erneut versuchen.');
        if (!Number.isInteger(msg.seed) || !Number.isFinite(msg.time) || !msg.spawn || ![msg.spawn.x, msg.spawn.y, msg.spawn.z].every(Number.isFinite)) {
          return fail('bad_request', 'Ungültige Weltdaten.');
        }
        pendingRoom = manager.create({
          seed: msg.seed >>> 0,
          time: Math.max(0, Math.floor(msg.time)),
          mode: msg.mode === 'creative' ? 'creative' : 'survival',
          worldName: String(msg.worldName ?? 'Welt').slice(0, 40),
          spawn: msg.spawn,
          dayLengthTicks,
        });
        pendingRoom.setHostState(msg.player, msg.position);
        conn.send({ t: 'roomCreated', code: pendingRoom.code, hostToken: pendingRoom.hostToken });
        return;
      }
      if (msg.t === 'uploadDone') {
        if (!pendingRoom) return;
        room = pendingRoom;
        pendingRoom = null;
        playerId = room.join(conn, name, true);
        return;
      }
      if (msg.t === 'joinRoom') {
        if (room || pendingRoom) return;
        if (!manager.joinLimiter.allow(ip)) return fail('rate_limited', 'Zu viele Versuche – bitte eine Minute warten.');
        const code = normalizeRoomCode(String(msg.code ?? ''));
        const r = isValidRoomCode(code, code.length || 6) ? manager.get(code) : undefined;
        if (!r || r.closed) return fail('not_found', 'Diesen Raum gibt es nicht (mehr). Prüfe den Code.');
        const asHost = !!msg.hostToken && msg.hostToken === r.hostToken && !r.hasHost();
        const id = r.join(conn, name, asHost);
        if (id === null) return fail('full', 'Der Raum ist voll.');
        room = r;
        playerId = id;
        return;
      }
      if (!room || playerId === null) return;
      if (msg.t === 'chat') {
        room.chat(playerId, msg.text);
        return;
      }
      if (msg.t === 'leave') {
        room.leave(playerId, true);
        room = null;
        playerId = null;
        return;
      }
      if (GAME_MESSAGES.has(msg.t)) room.handle(playerId, msg as ClientMessage);
    } catch (err) {
      log.debug('Ungültige Nachricht', err);
    }
  });

  ws.on('close', () => {
    if (room && playerId !== null) room.leave(playerId, false);
    if (pendingRoom) {
      pendingRoom.close('Erstellen abgebrochen.');
    }
  });
}
