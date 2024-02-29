import { promises } from "fs";

// eslint-disable-next-line n/no-extraneous-import
import { PluginOption } from "vite";

const decode64Raw = `function b64ToUint6(nChr) {
  return nChr > 64 && nChr < 91
    ? nChr - 65
    : nChr > 96 && nChr < 123
    ? nChr - 71
    : nChr > 47 && nChr < 58
    ? nChr + 4
    : nChr === 43
    ? 62
    : nChr === 47
    ? 63
    : 0
}

export default function base64ToUint8(sBase64, nBlocksSize) {
  const sB64Enc = sBase64.replace(/[^A-Za-z0-9+/]/g, "")
  const nInLen = sB64Enc.length
  const nOutLen = nBlocksSize
    ? Math.ceil(((nInLen * 3 + 1) >> 2) / nBlocksSize) * nBlocksSize
    : (nInLen * 3 + 1) >> 2
  const taBytes = new Uint8Array(nOutLen)

  let nMod3
  let nMod4
  let nUint24 = 0
  let nOutIdx = 0
  for (let nInIdx = 0; nInIdx < nInLen; nInIdx++) {
    nMod4 = nInIdx & 3
    nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << (6 * (3 - nMod4))
    if (nMod4 === 3 || nInLen - nInIdx === 1) {
      nMod3 = 0
      while (nMod3 < 3 && nOutIdx < nOutLen) {
        taBytes[nOutIdx] = (nUint24 >>> ((16 >>> nMod3) & 24)) & 255
        nMod3++
        nOutIdx++
      }
      nUint24 = 0
    }
  }

  return taBytes
}`

export default function vitePluginArraybuffer(): PluginOption {
  return {
    name: "vite-plugin-arraybuffer",
    resolveId(id) {
      if (
        id.endsWith("?arraybuffer") ||
        id.endsWith("?uint8array") ||
        id.endsWith("?arraybuffer&base64") ||
        id.endsWith("?uint8array&base64") ||
        id === "virtual:decode-64"
      ) {
        return id
      }
	  
      return
    },
    load(id) {
      if (id === "virtual:decode-64") {
        return decode64Raw
      }
      return
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
        const file = id.slice(0, -19)
        this.addWatchFile(file)

        const buffer = await promises.readFile(file)
        const b64 = buffer.toString("base64")

        return `import decode64 from 'virtual:decode-64'\nexport default decode64("${b64}").buffer`
      }
      if (id.endsWith("?uint8array&base64")) {
        const file = id.slice(0, -18)
        this.addWatchFile(file)

        const buffer = await promises.readFile(file)
        const b64 = buffer.toString("base64")

        return `import decode64 from 'virtual:decode-64'\nexport default decode64("${b64}")`
      }

      return;
    },
  };
}
