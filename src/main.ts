import { promises } from "fs";

// eslint-disable-next-line n/no-extraneous-import
import { PluginOption } from "vite";

export default function vitePluginArraybuffer(): PluginOption {
  return {
    name: "vite-plugin-arraybuffer",
    resolveId(id) {
      if (id.endsWith("?arraybuffer") || id.endsWith("?uint8array")) {
        return id
      }
    },
    async transform(_src, id) {
      if (id.endsWith("?arraybuffer")) {
        const file = id.slice(0, -12)
        this.addWatchFile(file)

        return `export default new Uint8Array([
          ${new Uint8Array(await promises.readFile(file)).join(',')}
        ]).buffer`;
      }
      if (id.endsWith("?uint8array")) {
        const file = id.slice(0, -11)
        this.addWatchFile(file)

        return `export default new Uint8Array([
          ${new Uint8Array(await promises.readFile(file)).join(',')}
        ])`;
      }

      return;
    },
  };
}
