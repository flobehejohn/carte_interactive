import { describe, test, expect, vi, beforeEach } from 'vitest';
import * as Sentry from '@sentry/react';
import { initializeSentry, logToSentry } from '../sentry-logger';
import { LogLevel, LogCategory } from '../constants';
import type { LogEntry } from '../types';

vi.mock('@sentry/react', () => ({
  init: vi.fn(),
  captureEvent: vi.fn(),
  Severity: {
    Error: 'error'
  }
}));

describe('Sentry Logger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('initialise Sentry avec les bonnes configurations', () => {
    const mockDsn = 'https://test-dsn@test.ingest.sentry.io/test';
    vi.stubEnv('VITE_SENTRY_DSN', mockDsn);

    initializeSentry();

    expect(Sentry.init).toHaveBeenCalledWith({
      dsn: mockDsn,
      integrations: expect.any(Array),
      tracesSampleRate: 1.0,
      environment: expect.any(String)
    });
  });

  test('n\'initialise pas Sentry si DSN n\'est pas défini', () => {
    vi.stubEnv('VITE_SENTRY_DSN', '');
    
    initializeSentry();
    
    expect(Sentry.init).not.toHaveBeenCalled();
  });

  test('envoie les erreurs à Sentry', () => {
    const testEntry: LogEntry = {
      timestamp: '2024-02-24T12:00:00.000Z',
      level: LogLevel.ERROR,
      message: 'Test error',
      metadata: {
        category: LogCategory.ERROR,
        component: 'TestComponent',
        stack: 'Error stack trace'
      }
    };

    logToSentry(testEntry);

    expect(Sentry.captureEvent).toHaveBeenCalledWith({
      message: testEntry.message,
      level: Sentry.Severity.Error,
      extra: testEntry.metadata
    });
  });

  test('n\'envoie pas les logs non-erreur à Sentry', () => {
    const testEntry: LogEntry = {
      timestamp: '2024-02-24T12:00:00.000Z',
      level: LogLevel.INFO,
      message: 'Test info',
      metadata: {
        category: LogCategory.USER_INTERACTION,
        component: 'TestComponent'
      }
    };

    logToSentry(testEntry);

    expect(Sentry.captureEvent).not.toHaveBeenCalled();
  });
});