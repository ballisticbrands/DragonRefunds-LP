import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  // Absolute base: the site is served at the custom-domain root
  // (dragonrefunds.com/, see public/CNAME). Absolute /assets/ paths are
  // required so nested SPA routes served as static index.html stubs
  // (e.g. /pricing/, /vs/getida/) load the bundle from /assets/ rather than
  // resolving it relative to their own path (/pricing/assets/ → 404).
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})