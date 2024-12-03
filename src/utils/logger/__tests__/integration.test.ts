import { describe, test, expect, beforeEach, vi } from 'vitest';
import { logger } from '../logger-service';
import { LogLevel, LogCategory } from '../constants';
import { logStorage } from '../storage';
import * as Sentry from '@sentry/react';

vi.mock('@sentry/react', () => ({
  captureEvent: vi.fn(),
  Severity: {
    Error: 'error'
  }
}));

describe('Logger Integration', () => {
  beforeEach(() => {
    logStorage.clear();
    vi.clearAllMocks();
  });

  test('le flux complet de logging fonctionne correctement', () => {
    const action = 'test_user_action';
    const component = 'TestComponent';

    // Log une action utilisateur
    logger.logUserAction(action, { component });

    // Vérifie le stockage
    const logs = logStorage.getAll();
    expect(logs).toHaveLength(1);
    expect(logs[0].metadata.category).toBe(LogCategory.USER_INTERACTION);

    // Log une erreur
    const error = new Error('Test error');
    logger.logError(error, component);

    // Vérifie que l'erreur est envoyée à Sentry
    expect(Sentry.captureEvent).toHaveBeenCalled();

    // Vérifie que les deux logs sont stockés
    expect(logStorage.getAll()).toHaveLength(2);
  });

  test('les performances sont correctement mesurées et loguées', async () => {
    const component = 'TestComponent';
    const operation = 'test_operation';

    // Simule une opération asynchrone
    const performOperation = async () => {
      const end = logger.logPerformance(component, operation, 100);
      await new Promise(resolve => setTimeout(resolve, 100));
      end();
    };

    await performOperation();

    const logs = logStorage.getAll();
    const perfLog = logs.find(log => 
      log.metadata.category === LogCategory.PERFORMANCE &&
      log.metadata.operation === operation
    );

    expect(perfLog).toBeDefined();
    expect(perfLog?.metadata.duration).toBeGreaterThan(0);
  });

  test('les requêtes réseau sont correctement loguées', () => {
    const url = 'https://api.example.com';
    const method = 'POST';
    const duration = 150;
    const status = 200;

    logger.logNetworkRequest(url, method, duration, status);

    const logs = logStorage.getAll();
    const networkLog = logs.find(log => 
      log.metadata.category === LogCategory.NETWORK &&
      log.metadata.url === url
    );

    expect(networkLog).toBeDefined();
    expect(networkLog?.metadata).toMatchObject({
      method,
      duration,
      status
    });
  });
});