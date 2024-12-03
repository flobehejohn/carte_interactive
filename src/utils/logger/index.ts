import { LogLevel, LogCategory } from './constants';
import { logger } from './logger-service';
import { initializeSentry } from './sentry-logger';
import type { LogEntry, LogMetadata } from './types';

// Export des types
export type { LogEntry, LogMetadata };

// Export des enums
export { LogLevel, LogCategory };

// Export du service logger et de l'initialisation Sentry
export { logger, initializeSentry };

// Export des fonctions du logger
export const {
  log,
  getLogs,
  logPerformance,
  logNetworkRequest,
  logUserAction,
  logError
} = logger;