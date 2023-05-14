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
