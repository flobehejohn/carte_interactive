import { logNetworkRequest } from '../utils/logger';

export async function fetchWithLogging(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const startTime = performance.now();
  let response: Response;

  try {
    response = await fetch(url, options);
    const duration = performance.now() - startTime;

    logNetworkRequest(
      url,
      options.method || 'GET',
      duration,
      response.status
    );

    return response;
  } catch (error) {
    const duration = performance.now() - startTime;
    logNetworkRequest(
      url,
      options.method || 'GET',
      duration,
      0
    );
    throw error;
  }
}