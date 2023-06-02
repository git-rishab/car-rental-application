import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { createServer } from 'vite';

export default defineConfig({
  // This changes the output dir from dist to build
  // comment this out if it isn't relevant for your project
  build: {
    outDir: 'build',
  },
  plugins: [reactRefresh()],
  server: {
    // Enable server middleware
    middleware: createCustomMiddleware(),
  },
});

function createCustomMiddleware() {
  return (req, res, next) => {
    // Custom middleware for handling client-side routing fallback
    const { url } = req;
    if (url.startsWith('/api')) {
      // Handle API requests as usual
      next();
    } else {
      // Serve index.html for all other routes
      req.url = '/index.html';
      next();
    }
  };
}
