import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      // Hack for WSL2
      usePolling: true,
    },
  },
  plugins: [vue()],
});
