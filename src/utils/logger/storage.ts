import type { LogEntry } from './types';

class LogStorage {
  private logs: LogEntry[] = [];

  add(entry: LogEntry): void {
    this.logs.push(entry);
  }

  getAll(): LogEntry[] {
    return [...this.logs];
  }

  clear(): void {
    this.logs = [];
  }
}

export const logStorage = new LogStorage();