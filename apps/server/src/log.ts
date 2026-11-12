const LEVELS = ['debug', 'info', 'warn', 'error'] as const;
type Level = (typeof LEVELS)[number];

export function createLogger(level: string) {
  const min = Math.max(0, LEVELS.indexOf(level as Level));
  const out = (lvl: Level, args: unknown[]): void => {
    if (LEVELS.indexOf(lvl) < min) return;
    const line = `[${new Date().toISOString()}] ${lvl.toUpperCase()}`;
    if (lvl === 'error') console.error(line, ...args);
    else if (lvl === 'warn') console.warn(line, ...args);
    else console.log(line, ...args);
  };
  return {
    debug: (...a: unknown[]) => out('debug', a),
    info: (...a: unknown[]) => out('info', a),
    warn: (...a: unknown[]) => out('warn', a),
    error: (...a: unknown[]) => out('error', a),
  };
}
export type Logger = ReturnType<typeof createLogger>;
