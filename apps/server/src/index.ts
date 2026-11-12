import { EnvError } from '@blockcraft/shared';
import { loadConfig } from './config';
import { createLogger } from './log';
import { startServer } from './server';

try {
  const config = loadConfig();
  const log = createLogger(config.LOG_LEVEL);
  const server = await startServer(config, log);
  const shutdown = (): void => {
    log.info('Server wird beendet …');
    void server.close().then(() => process.exit(0));
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
} catch (err) {
  if (err instanceof EnvError) {
    console.error(err.message);
    process.exit(1);
  }
  throw err;
}
