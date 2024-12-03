import { describe, test, expect, beforeEach } from 'vitest';
import { logStorage } from '../storage';
import { LogLevel, LogCategory } from '../constants';
import type { LogEntry } from '../types';

describe('LogStorage', () => {
  beforeEach(() => {
    logStorage.clear();
  });

  test('ajoute et récupère des logs', () => {
    const testEntry: LogEntry = {
      timestamp: '2024-02-24T12:00:00.000Z',
      level: LogLevel.INFO,
      message: 'Test message',
      metadata: {
        category: LogCategory.USER_INTERACTION,
        component: 'TestComponent'
      }
    };

    logStorage.add(testEntry);
    const logs = logStorage.getAll();

    expect(logs).toHaveLength(1);
    expect(logs[0]).toEqual(testEntry);
  });

  test('clear supprime tous les logs', () => {
    const testEntry: LogEntry = {
      timestamp: '2024-02-24T12:00:00.000Z',
      level: LogLevel.INFO,
      message: 'Test message',
      metadata: {
        category: LogCategory.USER_INTERACTION,
        component: 'TestComponent'
      }
    };

    logStorage.add(testEntry);
    expect(logStorage.getAll()).toHaveLength(1);

    logStorage.clear();
    expect(logStorage.getAll()).toHaveLength(0);
  });

  test('getAll retourne une copie des logs', () => {
    const testEntry: LogEntry = {
      timestamp: '2024-02-24T12:00:00.000Z',
      level: LogLevel.INFO,
      message: 'Test message',
      metadata: {
        category: LogCategory.USER_INTERACTION,
        component: 'TestComponent'
      }
    };

    logStorage.add(testEntry);
    const logs = logStorage.getAll();
    logs.push(testEntry);

    expect(logStorage.getAll()).toHaveLength(1);
  });
});