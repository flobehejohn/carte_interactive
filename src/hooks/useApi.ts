import { useState, useCallback } from 'react';
import { httpClient } from '../utils/http-client';
import { useLogger } from './useLogger';

interface ApiHookResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  fetch: () => Promise<void>;
}

export function useApi<T>(path: string): ApiHookResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { logError } = useLogger('useApi');

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await httpClient.get<T>(path);
      setData(response);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur inconnue');
      setError(error);
      logError(error);
    } finally {
      setLoading(false);
    }
  }, [path, logError]);

  return { data, loading, error, fetch };
}