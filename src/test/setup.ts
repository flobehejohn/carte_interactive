import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock console methods
const consoleMock = {
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn(),
};

global.console = {
  ...console,
  ...consoleMock,
};

// Mock performance API
global.performance = {
  ...performance,
  now: vi.fn(() => 1000),
};

// Mock environment variables
process.env.VITE_SENTRY_DSN = 'https://test-dsn@test.ingest.sentry.io/test';