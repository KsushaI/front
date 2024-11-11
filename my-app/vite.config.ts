import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
/*export default defineConfig({
  server: { port: 3000 },
  plugins: [react()],
})*/

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/visas_api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/visas_api/, "/"),
      },
    },
  },
});