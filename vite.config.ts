import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        sourcemapBaseUrl: '/',
        sourcemapPathTransform: (relativeSourcePath) => {
          return resolve(__dirname, relativeSourcePath);
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  },
  optimizeDeps: {
    include: [
      'react-easy-crop',
      'recharts'
    ]
  }
});