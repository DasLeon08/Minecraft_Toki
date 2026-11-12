import { parseEnv, type EnvSchema } from '@blockcraft/shared';

export const serverSchema = {
  PORT: { type: 'int', default: 8080, min: 0, max: 65535 },
  ALLOWED_ORIGINS: { type: 'list', default: [] as string[] },
  CLIENT_DIST_DIR: { type: 'string', default: 'apps/client/dist' },
  MAX_ROOMS: { type: 'int', default: 3, min: 1, max: 1000 },
  MAX_PLAYERS_PER_ROOM: { type: 'int', default: 4, min: 1, max: 64 },
  ROOM_CODE_LENGTH: { type: 'int', default: 6, min: 4, max: 12 },
  TICK_RATE: { type: 'int', default: 20, min: 5, max: 60 },
  MAX_VIEW_DISTANCE: { type: 'int', default: 6, min: 2, max: 16 },
  ROOM_IDLE_TIMEOUT_MIN: { type: 'int', default: 10, min: 1, max: 1440 },
  JOIN_RATE_LIMIT_PER_MIN: { type: 'int', default: 30, min: 1, max: 10000 },
  LOG_LEVEL: { type: 'string', default: 'info', oneOf: ['debug', 'info', 'warn', 'error'] },
} satisfies EnvSchema;

export type ServerConfig = ReturnType<typeof loadConfig>;

export function loadConfig(source: Record<string, string | undefined> = process.env) {
  return parseEnv(serverSchema, source);
}
