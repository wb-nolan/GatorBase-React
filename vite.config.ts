import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Use '0.0.0.0' to allow access from external devices
    port: 80,      // Change this to your desired port
    proxy: {
      // Proxy API requests to FastAPI
      '/api': {
        target: 'http://localhost:8000',  // FastAPI server
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),  // Optional: strip "/api" prefix
      }
    }
  }
});
