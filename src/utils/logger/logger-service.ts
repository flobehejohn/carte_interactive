import { LogLevel, LogCategory } from './constants';
import type { LogMetadata, LogEntry, LoggerService } from './types';
import { logStorage } from './storage';
import { logToConsole } from './console-logger';
import { logToSentry } from './sentry-logger';

class Logger implements LoggerService {
  public log(level: LogLevel, message: string, metadata: LogMetadata): void {
    const entry = this.createLogEntry(level, message, metadata);
    logStorage.add(entry);
    logToConsole(entry);
    logToSentry(entry);
  }

  public getLogs(): LogEntry[] {
    return logStorage.getAll();
  }

  public logPerformance(component: string, operation: string, duration: number): void {
    this.log(LogLevel.INFO, 'Performance measurement', {
      category: LogCategory.PERFORMANCE,
      component,
      operation,
      duration
    });
  }

  public logNetworkRequest(url: string, method: string, duration: number, status?: number): void {
    this.log(LogLevel.INFO, 'Network request', {
      category: LogCategory.NETWORK,
      url,
      method,
      duration,
      status
    });
  }

  public logUserAction(action: string, details: any = {}): void {
    this.log(LogLevel.INFO, `User action: ${action}`, {
      category: LogCategory.USER_INTERACTION,
      ...details
    });
  }

  public logError(error: Error, component?: string): void {
    this.log(LogLevel.ERROR, error.message, {
      category: LogCategory.ERROR,
      component,
      stack: error.stack
    });
  }

  private createLogEntry(level: LogLevel, message: string, metadata: LogMetadata): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata: {
        ...metadata,
        sourceUrl: window.location.href
      }
    };
  }
}

// Export une instance unique du logger
export const logger = new Logger();