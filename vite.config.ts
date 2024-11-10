import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import i18nextLoader from 'vite-plugin-i18next-loader';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    i18nextLoader({
      paths: ['./public/locales']
    })],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  assetsInclude: ['**/*.json']
})
