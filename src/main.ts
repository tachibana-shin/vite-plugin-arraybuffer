import { promises } from "fs";

// eslint-disable-next-line n/no-extraneous-import
import { PluginOption } from "vite";

export default function vitePluginArraybuffer(): PluginOption {
  return {
    name: "vite-plugin-arraybuffer",
    async transform(_src, id) {
      if (id.endsWith("?arraybuffer")) {
        return `export default new Uint8Array([
          ${new Uint8Array(await promises.readFile(id.slice(0, -12)))}
        ]).buffer`;
      }
      if (id.endsWith("?uint8array")) {
        return `export default new Uint8Array([
          ${new Uint8Array(await promises.readFile(id.slice(0, -11)))}
        ])`;
      }

      return;
    },
  };
}
