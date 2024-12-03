import { describe, test, expect, beforeEach, vi } from 'vitest';
import { logger } from '../logger-service';
import { LogLevel, LogCategory } from '../constants';
import { logStorage } from '../storage';

describe('Logger Service', () => {
  beforeEach(() => {
    logStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-02-24T12:00:00Z'));
  });

  test('log crée une entrée avec le bon format', () => {
    const message = 'Test message';
    const metadata = {
      category: LogCategory.USER_INTERACTION,
      component: 'TestComponent'
    };

    logger.log(LogLevel.INFO, message, metadata);
    const logs = logger.getLogs();

    expect(logs).toHaveLength(1);
    expect(logs[0]).toEqual({
      timestamp: '2024-02-24T12:00:00.000Z',
      level: LogLevel.INFO,
      message,
      metadata
    });
  });

  test('logUserAction enregistre une action utilisateur', () => {
    const action = 'test_action';
    const details = { component: 'TestComponent' };

    logger.logUserAction(action, details);
    const logs = logger.getLogs();

    expect(logs).toHaveLength(1);
    expect(logs[0].metadata.category).toBe(LogCategory.USER_INTERACTION);
    expect(logs[0].message).toBe(`User action: ${action}`);
    expect(logs[0].metadata.component).toBe(details.component);
  });

  test('logError enregistre une erreur avec la stack trace', () => {
    const error = new Error('Test error');
    const component = 'TestComponent';

    logger.logError(error, component);
    const logs = logger.getLogs();

    expect(logs).toHaveLength(1);
    expect(logs[0].level).toBe(LogLevel.ERROR);
    expect(logs[0].metadata.category).toBe(LogCategory.ERROR);
    expect(logs[0].metadata.component).toBe(component);
    expect(logs[0].metadata.stack).toBeDefined();
  });

  test('logPerformance enregistre une mesure de performance', () => {
    const component = 'TestComponent';
    const operation = 'test_operation';
    const duration = 100;

    logger.logPerformance(component, operation, duration);
    const logs = logger.getLogs();

    expect(logs).toHaveLength(1);
    expect(logs[0].metadata.category).toBe(LogCategory.PERFORMANCE);
    expect(logs[0].metadata.component).toBe(component);
    expect(logs[0].metadata.operation).toBe(operation);
    expect(logs[0].metadata.duration).toBe(duration);
  });

  test('logNetworkRequest enregistre une requête réseau', () => {
    const url = 'https://api.example.com';
    const method = 'GET';
    const duration = 50;
    const status = 200;

    logger.logNetworkRequest(url, method, duration, status);
    const logs = logger.getLogs();

    expect(logs).toHaveLength(1);
    expect(logs[0].metadata.category).toBe(LogCategory.NETWORK);
    expect(logs[0].metadata.url).toBe(url);
    expect(logs[0].metadata.method).toBe(method);
    expect(logs[0].metadata.duration).toBe(duration);
    expect(logs[0].metadata.status).toBe(status);
  });
});