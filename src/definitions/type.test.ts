import { describe, expect, test } from "vitest";
import { number, string } from "../builtIns";
import { Pattern } from "./pattern";
import { TypeDefinition } from "./type";

describe("TypeDefinition", () => {
  test("should be able to create an TypeDefinition", () => {
    expect(() => {
      new TypeDefinition("key", {
        parse: (value) => value,
        validate: (input) => typeof input === "string",
        pattern: new Pattern<`"${string}"`>(),
      });
    }).not.toThrow();
  });
  test("should be able to parse", () => {
    expect(string.definition.parse("hello")).toBe("hello");
    expect(number.definition.parse("hello")).toBeNaN();
    expect(number.definition.parse("12")).toBe(12);
  });
  test("should be able to validate", () => {
    expect(string.definition.validate("hello")).toBeTruthy();
    expect(number.definition.validate("hello")).toBeFalsy();
    expect(number.definition.validate(12)).toBeTruthy();
  });
  test("should be able to get pattern", () => {
    const type = new TypeDefinition("key", {
      parse: (value) => value,
      validate: (input) => typeof input === "string",
    });
    expect(type.definition.pattern).toBeInstanceOf(Pattern);
  });
});
