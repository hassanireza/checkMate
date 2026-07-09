import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The base path defaults to '/' for local development and custom domains.
// GitHub Actions overrides it to '/<repository-name>/' at build time via
// the VITE_BASE_PATH environment variable so assets resolve correctly
// under https://<user>.github.io/<repository-name>/.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH ?? '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
