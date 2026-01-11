import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    allowedHosts: [
      'subphylar-remy-enforceable.ngrok-free.dev'
    ]
  }
})
