import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path"

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
         additionalData: `@use "${resolve('src/assets/var.scss')}" as *;`
      }
      // sass: {
      //   modifyVars: {
      //     hack: `true; @import (reference) "${resolve('src/assets/var.scss')}";`,
      //   },
      //   javascriptEnabled: true,
      // }
    }
  },
})
