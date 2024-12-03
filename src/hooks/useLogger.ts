import { useCallback } from 'react';
import { logger } from '../utils/logger';

export function useLogger(component: string) {
  const logAction = useCallback((action: string, details: any = {}) => {
    logger.logUserAction(action, {
      component,
      ...details
    });
  }, [component]);

  const logError = useCallback((error: Error) => {
    logger.logError(error, component);
  }, [component]);

  const measurePerformance = useCallback((operation: string) => {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      logger.logPerformance(component, operation, duration);
    };
  }, [component]);

  return {
    logAction,
    logError,
    measurePerformance
  };
}