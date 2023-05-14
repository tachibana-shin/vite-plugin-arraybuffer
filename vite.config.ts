import { defineConfig } from "vite";
import vitePluginArraybuffer from "./src/main";

export default defineConfig({
  plugins: [vitePluginArraybuffer()],
});
