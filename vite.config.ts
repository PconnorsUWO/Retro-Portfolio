import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  base: '/Retro-Portfolio/',
  build: { 
    outDir: 'dist',
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
      ],
    },
  },
})