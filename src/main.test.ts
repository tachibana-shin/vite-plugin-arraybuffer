import arrayBuffer from "./typescript.svg?arraybuffer";
import uint8array from "./typescript.svg?uint8array";
import crypto from "node:crypto";

import { describe, expect, test } from "vitest";

const hash = (buffer: ArrayBuffer) => crypto.createHash("md5").update(Buffer.from(buffer)).digest("hex");

describe("test plugin", () => {
  test("?arraybuffer", () => {
    expect(arrayBuffer[Symbol.toStringTag]).toBe("ArrayBuffer");
    expect(arrayBuffer instanceof ArrayBuffer).toBe(true);
    expect(hash(arrayBuffer)).toEqual("7167f7caac27a336c58b0c16cc5003d7");
  });
  test("?uint8array", () => {
    expect(uint8array[Symbol.toStringTag]).toBe("Uint8Array");
    expect(uint8array instanceof Uint8Array).toBe(true);
    expect(hash(uint8array.buffer)).toEqual("7167f7caac27a336c58b0c16cc5003d7");
  });
});
