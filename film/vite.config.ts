import { defineConfig } from 'vite';
import path from 'node:path';

const root = import.meta.dirname;

export default defineConfig({
  root,
  publicDir: 'public',
  server: {
    port: 5173,
    strictPort: false,
    hmr: process.env.FILM_NO_HMR ? false : undefined,
    fs: { allow: [root] },
  },
  resolve: { alias: { '@': path.join(root, 'src') } },
  build: { target: 'esnext' },
});
