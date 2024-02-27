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
	  
	  return;
    },
    async transform(_src, id) {
      if (id.endsWith("?arraybuffer")) {
        const file = id.slice(0, -12)
        this.addWatchFile(file)

        const buffer = await promises.readFile(file)
        const b64 = buffer.toString('base64')

        return `export default new Uint8Array(
          Buffer.from('${b64}', 'base64')
        ).buffer`
      }
      if (id.endsWith("?uint8array")) {
        const file = id.slice(0, -11)
        this.addWatchFile(file)

        const buffer = await promises.readFile(file)
        const b64 = buffer.toString('base64')

        return `export default new Uint8Array(
          Buffer.from('${b64}', 'base64')
        )`;
      }

      return;
    },
  };
}
