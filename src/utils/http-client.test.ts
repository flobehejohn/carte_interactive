import { describe, test, expect, vi, beforeEach } from 'vitest';
import { httpClient } from './http-client';
import { logger } from './logger';

vi.mock('./logger', () => ({
  logger: {
    logError: vi.fn(),
    logNetworkRequest: vi.fn()
  }
}));

describe('HttpClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  test('gère correctement une réponse 426 Upgrade Required', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce(new Response(null, {
      status: 426,
      statusText: 'Upgrade Required'
    }));

    await expect(httpClient.get('/test')).rejects.toThrow('Une mise à jour de l\'application est nécessaire');
    expect(logger.logError).toHaveBeenCalled();
  });

  test('inclut la version de l\'API dans les headers', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce(new Response(JSON.stringify({ data: 'test' }), {
      status: 200
    }));

    await httpClient.get('/test');

    expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
      headers: expect.any(Headers)
    }));

    const call = vi.mocked(fetch).mock.calls[0];
    const headers = call[1]?.headers as Headers;
    expect(headers.get('X-API-Version')).toBe('1.0');
  });

  test('gère le timeout des requêtes', async () => {
    const mockAbort = vi.fn();
    const mockController = { abort: mockAbort, signal: {} };
    vi.spyOn(global, 'AbortController').mockImplementation(() => mockController as any);

    global.fetch = vi.fn().mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve(new Response()), 1000);
    }));

    try {
      await httpClient.get('/test', { timeout: 100 });
    } catch (error) {
      // Le timeout devrait déclencher l'abort
    }

    expect(mockAbort).toHaveBeenCalled();
  });
});