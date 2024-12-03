import { logger } from './logger';

interface RequestConfig extends RequestInit {
  version?: string;
  timeout?: number;
}

const DEFAULT_TIMEOUT = 30000;
const API_VERSION = '1.0';

class HttpClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || '';
  }

  private async handleResponse(response: Response): Promise<any> {
    if (response.status === 426) {
      logger.logError(new Error('Version API incompatible'), 'HttpClient');
      throw new Error('Une mise à jour de l\'application est nécessaire');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Erreur réseau' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  private createHeaders(config?: RequestConfig): Headers {
    const headers = new Headers(config?.headers);
    headers.set('X-API-Version', config?.version || API_VERSION);
    headers.set('Content-Type', 'application/json');
    return headers;
  }

  private async fetchWithTimeout(url: string, config: RequestConfig = {}): Promise<Response> {
    const timeout = config.timeout || DEFAULT_TIMEOUT;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const startTime = performance.now();
      const response = await fetch(url, {
        ...config,
        headers: this.createHeaders(config),
        signal: controller.signal
      });
      const duration = performance.now() - startTime;

      logger.logNetworkRequest(url, config.method || 'GET', duration, response.status);
      return response;
    } finally {
      clearTimeout(id);
    }
  }

  public async get<T>(path: string, config?: RequestConfig): Promise<T> {
    const url = new URL(path, this.baseUrl);
    const response = await this.fetchWithTimeout(url.toString(), {
      ...config,
      method: 'GET'
    });
    return this.handleResponse(response);
  }

  public async post<T>(path: string, data: any, config?: RequestConfig): Promise<T> {
    const url = new URL(path, this.baseUrl);
    const response = await this.fetchWithTimeout(url.toString(), {
      ...config,
      method: 'POST',
      body: JSON.stringify(data)
    });
    return this.handleResponse(response);
  }

  public async put<T>(path: string, data: any, config?: RequestConfig): Promise<T> {
    const url = new URL(path, this.baseUrl);
    const response = await this.fetchWithTimeout(url.toString(), {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return this.handleResponse(response);
  }

  public async delete<T>(path: string, config?: RequestConfig): Promise<T> {
    const url = new URL(path, this.baseUrl);
    const response = await this.fetchWithTimeout(url.toString(), {
      ...config,
      method: 'DELETE'
    });
    return this.handleResponse(response);
  }
}

export const httpClient = new HttpClient();