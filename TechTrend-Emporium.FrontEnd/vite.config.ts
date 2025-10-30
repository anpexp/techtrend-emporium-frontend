import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@atoms': fileURLToPath(new URL('./src/components/atoms', import.meta.url)),
      '@molecules': fileURLToPath(new URL('./src/components/molecules', import.meta.url)),
      '@organisms': fileURLToPath(new URL('./src/components/organisms', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
