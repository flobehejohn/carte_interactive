import type { LogEntry } from './types';

export function logToConsole(entry: LogEntry): void {
  if (!import.meta.env.DEV) return;

  const consoleMethod = entry.level === 'error' ? 'error' : 
                       entry.level === 'warn' ? 'warn' : 
                       entry.level === 'debug' ? 'debug' : 'log';

  console[consoleMethod](
    `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`,
    entry.metadata
  );
}