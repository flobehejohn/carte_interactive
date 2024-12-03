import { describe, test, expect, vi, beforeEach } from 'vitest';
import { logToConsole } from '../console-logger';
import { LogLevel, LogCategory } from '../constants';
import type { LogEntry } from '../types';

describe('Console Logger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('utilise la bonne méthode console selon le niveau de log', () => {
    const testCases: Array<[LogLevel, keyof Console]> = [
      [LogLevel.INFO, 'log'],
      [LogLevel.WARN, 'warn'],
      [LogLevel.ERROR, 'error'],
      [LogLevel.DEBUG, 'debug']
    ];

    testCases.forEach(([level, method]) => {
      const testEntry: LogEntry = {
        timestamp: '2024-02-24T12:00:00.000Z',
        level,
        message: 'Test message',
        metadata: {
          category: LogCategory.USER_INTERACTION,
          component: 'TestComponent'
        }
      };

      logToConsole(testEntry);
      expect(console[method]).toHaveBeenCalled();
    });
  });
});