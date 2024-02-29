## vite-plugin-arraybuffer

Vite plugin for import file with ArrayBuffer or Uint8Array!

### Install

```bash
pnpm add vite-plugin-arraybuffer -D
```

### Usage

vite.config.ts

```ts
import { defineConfig } from "vite";
import arraybuffer from "vite-plugin-arraybuffer";

export default defineConfig({
  plugins: [arraybuffer()],
});
```

```main.ts
import arrayBuffer from "./typescript.svg?arraybuffer";
import uint8array from "./typescript.svg?uint8array";
```

Reduce compilation size
This module uses the primitive translation method to `int8` which will double the file size after compilation but it runs very fast because it can be copied directly to RAM.

However, for those who want the advantage of packet size there is an additional option called `base64` which will only increase the packet size by `20%` however it will require the browser to decode the base64 before it can be copied. gets into RAM
báe64

```main.ts
import arrayBuffer from "./typescript.svg?arraybuffer&base64";
import uint8array from "./typescript.svg?uint8array&base64";
```

Thanks [@kevlened](https://github.com/kevlened) for the `base64` support work done by



### TypeScript support

This plugin also supports typing for typescript

tsconfig.json

```json
{
  "compilerOptions": {
    "types": ["vite-plugin-arraybuffer/types"]
  },
  "include": ["src"]
}
```
