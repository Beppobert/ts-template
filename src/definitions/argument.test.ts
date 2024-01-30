import { describe, expect, test } from "vitest";
import { number, string } from "../builtIns";
import { ArgDefinition } from "./argument";

describe("ArgDefinition", () => {
  test("should be able to create an ArgDefinition", () => {
    expect(() => {
      new ArgDefinition("key", string);
    }).not.toThrow();
  });
  test("should be able to create an ArgDefinition with a number type", () => {
    expect(() => {
      new ArgDefinition("key", number);
    }).not.toThrow();
  });
});
