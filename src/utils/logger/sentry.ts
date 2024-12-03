import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import type { LogEntry } from './types';

export function initializeSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  
  if (dsn) {
    Sentry.init({
      dsn,
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
      environment: import.meta.env.MODE,
    });
  }
}

export function captureLogEntry(entry: LogEntry) {
  if (entry.level === 'error') {
    Sentry.captureEvent({
      message: entry.message,
      level: Sentry.Severity.Error,
      extra: entry.metadata
    });
  }
}