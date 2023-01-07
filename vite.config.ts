import { defineConfig } from "vitest/config";
import ReactPlugin from "@vitejs/plugin-react-swc";
import { ViteAliases } from "vite-aliases";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  test: {
    environment: "jsdom",
  },
  plugins: [
    ReactPlugin(),
    ViteAliases(),
    VitePWA({
      manifest: {
        name: "t3p",
        short_name: "t3p",
        description: "t3p",
        theme_color: "#000000",
        icons: [
          {
            src: "assets/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "assets/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "assets/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
