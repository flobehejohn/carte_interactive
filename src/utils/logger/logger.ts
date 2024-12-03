import { initializeSentry, captureLogEntry } from './sentry';
import type { LogCategory, LogMetadata, LogEntry } from './types';

// Local storage for logs
const logs: LogEntry[] = [];

function createLogEntry(
  level: 'info' | 'warn' | 'error' | 'debug',
  message: string,
  metadata: LogMetadata
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    metadata
  };
}

export function log(
  level: 'info' | 'warn' | 'error' | 'debug',
  message: string,
  metadata: LogMetadata
) {
  const entry = createLogEntry(level, message, metadata);
  
  // Store locally
  logs.push(entry);

  // Console logging in development
  if (import.meta.env.DEV) {
    const consoleMethod = level === 'error' ? 'error' : 
                         level === 'warn' ? 'warn' : 
                         level === 'debug' ? 'debug' : 'log';
    console[consoleMethod](
      `[${entry.timestamp}] ${level.toUpperCase()}: ${message}`,
      metadata
    );
  }

  // Send to Sentry if configured
  captureLogEntry(entry);
}

export function getLogs() {
  return logs;
}

export function logPerformance(component: string, operation: string, duration: number) {
  log('info', `Performance measurement`, {
    category: LogCategory.PERFORMANCE,
    component,
    operation,
    duration
  });
}

export function logNetworkRequest(url: string, method: string, duration: number, status?: number) {
  log('info', `Network request`, {
    category: LogCategory.NETWORK,
    url,
    method,
    duration,
    status
  });
}

export function logUserAction(action: string, details: any) {
  log('info', `User action: ${action}`, {
    category: LogCategory.USER_INTERACTION,
    ...details
  });
}

export function logError(error: Error, component?: string) {
  log('error', error.message, {
    category: LogCategory.ERROR,
    component,
    stack: error.stack
  });
}