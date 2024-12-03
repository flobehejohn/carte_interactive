import * as Sentry from '@sentry/react';
import type { LogEntry } from './types';

export function initializeSentry(): void {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  
  if (dsn) {
    Sentry.init({
      dsn,
      integrations: [new Sentry.BrowserTracing()],
      tracesSampleRate: 1.0,
      environment: import.meta.env.MODE,
    });
  }
}

export function logToSentry(entry: LogEntry): void {
  if (entry.level === 'error') {
    Sentry.captureEvent({
      message: entry.message,
      level: 'error' as Sentry.SeverityLevel,
      extra: entry.metadata
    });
  }
}