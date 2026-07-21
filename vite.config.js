import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  // Relative base so assets resolve both at the custom-domain root
  // (dragonrefunds.com/) and at the GitHub Pages project subpath
  // (ballisticbrands.github.io/DragonRefunds-LP/) for previewing.
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})