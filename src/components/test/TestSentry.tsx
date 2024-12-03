import { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { Box, Button, Typography } from '@mui/material';

export function TestSentry() {
  useEffect(() => {
    // Test that Sentry is properly initialized
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    if (!dsn) {
      console.warn('Sentry DSN is not configured');
    }
  }, []);

  const testError = () => {
    try {
      throw new Error('Test error from TestSentry component');
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Sentry Test Component
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={testError}
        sx={{ mt: 2 }}
      >
        Test Sentry Error
      </Button>
    </Box>
  );
}