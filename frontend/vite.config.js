import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  // This changes the output dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: 'build',
  },
  plugins: [reactRefresh()],
  server: {
    // Enable server-side fallback
    fs: {
      strict: true,
    },
    proxy: {
      // Fallback all routes to index.html
      '/api': {
        target: 'https://drive-away.vercel.app', // Replace with your API server URL if needed
        changeOrigin: true,
        rewrite: (req) => req.url.startsWith('/api') ? req.url : '/index.html',
      },
      // Add more proxy rules if needed
    },
  },
});
