import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
