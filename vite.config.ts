import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    svgr({ svgrOptions: { icon: true } }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      store: path.resolve(__dirname, "./store"),
      hooks: path.resolve(__dirname, "./hooks"),

      // 🔴 REQUIRED
      buffer: "buffer/",
    },
  },

  define: {
    global: "globalThis",
    "process.env": {},
  },

  optimizeDeps: {
    include: ["buffer", "process"],
  },
  server: {
    allowedHosts: [
      '0dd409e3d851.ngrok-free.app'
    ]
  }
});
