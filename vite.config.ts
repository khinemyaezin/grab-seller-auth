import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/" : "/mfe/auth/",
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  plugins: [
    react(),
    federation({
      name: "seller_auth",
      filename: "remoteEntry.js",
      manifest: true,
      dts: {
        generateTypes: {
          tsConfigPath: "./tsconfig.app.json",
          abortOnError: true,
        },
      },
      exposes: { "./Routes": "./src/app/AuthRoutes.tsx" },
      shared: {
        react: { singleton: true, requiredVersion: "19.2.4" },
        "react-dom": { singleton: true, requiredVersion: "19.2.4" },
        "react-router": { singleton: true, requiredVersion: "7.18.0" },
        "@tanstack/react-query": { singleton: true, requiredVersion: "5.99.2" },
        "@grab/seller-api": { singleton: true, requiredVersion: "0.1.0" },
      },
    }),
  ],
  server: {
    port: 3003,
    origin: "http://localhost:3003",
    cors: { origin: "http://localhost:3000" },
    proxy: { "/api": { target: "http://localhost:8080", changeOrigin: true, xfwd: true } },
  },
  preview: { port: 3003 },
  build: { target: "chrome111" },
}));
