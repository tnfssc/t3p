import { defineConfig } from "vitest/config";
import ReactPlugin from "@vitejs/plugin-react-swc";
import { ViteAliases } from "vite-aliases";

export default defineConfig({
  test: {
    environment: "jsdom",
  },
  plugins: [ReactPlugin(), ViteAliases()],
});
