import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/main.ts"],
  clean: true,
  format: ["esm", "cjs"],
  dts: true,
});
