import arrayBuffer from "./typescript.svg?arraybuffer";
import uint8array from "./typescript.svg?uint8array";

import { describe, expect, test } from "vitest";

describe("test plugin", () => {
  test("?arraybuffer", () => {
    expect(arrayBuffer[Symbol.toStringTag]).toBe("ArrayBuffer");
    expect(arrayBuffer instanceof ArrayBuffer).toBe(true);
  });
  test("?uint8array", () => {
    expect(uint8array[Symbol.toStringTag]).toBe("Uint8Array");
    expect(uint8array instanceof Uint8Array).toBe(true);
  });
});
