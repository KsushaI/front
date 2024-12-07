import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import fs from 'fs';
//import path from 'path';

// https://vite.dev/config/
/*export default defineConfig({
  server: { port: 3000 },
  plugins: [react()],
})*/

export default defineConfig({
  plugins: [react()],
  base: "/front",  
  server: {
    /*
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'C:/Users/Ksu/Documents/certs/localhost+1-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'C:/Users/Ksu/Documents/certs/localhost+1.pem')),
    },*/
    proxy: {
      "/visas_api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/apps_api": 
      {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/apps_visas_api": 
      {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },  
    port: 4000,
    host: '0.0.0.0'
  },
});