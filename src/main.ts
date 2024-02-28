import { promises } from "fs";

// eslint-disable-next-line n/no-extraneous-import
import { PluginOption } from "vite";

export default function vitePluginArraybuffer(): PluginOption {
  return {
    name: "vite-plugin-arraybuffer",
    resolveId(id) {
      if (
        id.endsWith("?arraybuffer") ||
        id.endsWith("?uint8array") ||
        id.endsWith("?arraybuffer&base64") ||
        id.endsWith("?uint8array&base64")
      ) {
        return id
      }
	  
	  return;
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
      if (id.endsWith("?arraybuffer&base64")) {
        const file = id.slice(0, -12)
        this.addWatchFile(file)

        const buffer = await promises.readFile(file)
        const b64 = buffer.toString("base64")

        return `
          function toUint8(b64) {
            let bin = atob(b64);
            let len = bin.length;
            let bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
              bytes[i] = bin.charCodeAt(i);
            }
            return bytes;
          }
          
          export default toUint8("${b64}").buffer
        `
      }
      if (id.endsWith("?uint8array&base64")) {
        const file = id.slice(0, -11)
        this.addWatchFile(file)

        const buffer = await promises.readFile(file)
        const b64 = buffer.toString("base64")

        return `
          function toUint8(b64) {
            let bin = atob(b64);
            let len = bin.length;
            let bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
              bytes[i] = bin.charCodeAt(i);
            }
            return bytes;
          }
          
          export default toUint8("${b64}")
        `
      }

      return;
    },
  };
}
