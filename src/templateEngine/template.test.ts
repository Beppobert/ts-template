import { describe, expect, test } from "vitest";
import { schema } from "../builtIns/schema/schema";
import { template } from "./createTemplateFn";

describe("Template", () => {
  const t = template(schema);

  test("should replace a simple value", () => {
    const fn = t("{{name}}");
    expect(fn({ name: "John" })).toBe("John");
  });

  test("should replace multiple values", () => {
    const fn = t("{{name}} {{surname}}");
    expect(fn({ name: "John", surname: "Doe" })).toBe("John Doe");
  });

  test("should replace multiple occurrences of the same value", () => {
    const fn = t("{{name}} {{name}}");
    expect(fn({ name: "John" })).toBe("John John");
  });

  test("should replace a value with a custom operation", () => {
    const fn = t("{{name|toUpper}}");
    expect(fn({ name: "John" })).toBe("JOHN");
  });

  test("should replace a value with a custom operation with arguments", () => {
    const fn = t('{{name|padStart(10,"-")}}');
    expect(fn({ name: "John" })).toBe("------John");
  });

  test("should replace a value with a custom operation with multiple arguments", () => {
    const fn = t('{{name|padStart(10,"-")|padEnd(15,"-")}}');
    expect(fn({ name: "John" })).toBe("------John-----");
  });

  test("should convert types", () => {
    const fn = t("{{name|strToNumber|numberToString(10)}}");
    expect(fn({ name: "123" })).toBe("123");
  });

  test("should throw if if types don't match ", () => {
    expect(() => t("{{name|numberToString(10)}}" as any as never)).toThrow();
  });

  test("should throw if a required parameter is missing", () => {
    expect(() => t("{{name|padStart(10,)}}" as never)).toThrow();
  });

  test("Should be not optional if one occurrance is not optional", () => {
    const fn = t('{{name|padStart(10,"a")}}{{?name|padStart(10,"a")}}');
    expect(fn).toThrow();
    const fn2 = t('{{?name|padStart(10,"a")}}{{name|padStart(10,"a")}}');
    expect(fn2).toThrow();
  });

  test("Should be optional if all occurrances are optional", () => {
    const fn = t('{{?name|padStart(10,"a")}}{{?name|padStart(10,"a")}}');
    expect(fn({})).toBe("");
  });

  test("types", () => {
    const fn = t("{{ms#number|numberToString(10)}}");
    const date = new Date();
    expect(fn({ ms: date.getTime() })).toBe(date.getTime().toString());
  });
});
