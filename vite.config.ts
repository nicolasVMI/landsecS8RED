import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import glsl from "vite-plugin-glsl"
import basicSsl from "@vitejs/plugin-basic-ssl"

export default defineConfig({
  plugins: [
    react(),
    glsl(),
    basicSsl()
  ],
  root: "./src",
  publicDir: "../public/",
  base: "./",
  resolve: {
    alias: [
      { find: "@utils", replacement: "/utils" },
      { find: "@lib", replacement: "/lib" },
      { find: "@pages", replacement: "/pages" },
      { find: "@components", replacement: "/components" },
      { find: "@canvas_components", replacement: "/canvas_components" },
      { find: "@state", replacement: "/state" },
      { find: "@data", replacement: "/data" },
      { find: "@layout", replacement: "/layout" },
      { find: "@routes", replacement: "/routes" },
    ],
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  server: {
    host: true,
    open: true,
    port: 1234
  },
  build: {
    outDir: "../build",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: 'plugin.js',
        assetFileNames: 'plugin.css',
        chunkFileNames: "chunk.js",
      }
    }
  },
})
