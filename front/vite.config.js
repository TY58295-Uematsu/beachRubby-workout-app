import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
      '/register': {
        target: 'http://localhost:3000',
      },
      '/login': {
        target: 'http://localhost:3000',
      },
      '/logout': {
        target: 'http://localhost:3000',
      },
    },
  },
});
