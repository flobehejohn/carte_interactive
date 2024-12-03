import { LogLevel, LogCategory } from './constants';

export interface LogMetadata {
  category: LogCategory;
  component?: string;
  userId?: string;
  [key: string]: any;
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  metadata: LogMetadata;
}

export interface LoggerService {
  log: (level: LogLevel, message: string, metadata: LogMetadata) => void;
  getLogs: () => LogEntry[];
  logPerformance: (component: string, operation: string, duration: number) => void;
  logNetworkRequest: (url: string, method: string, duration: number, status?: number) => void;
  logUserAction: (action: string, details: any) => void;
  logError: (error: Error, component?: string) => void;
}