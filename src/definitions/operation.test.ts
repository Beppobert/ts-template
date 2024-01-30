import { describe, expect, test } from "vitest";
import { string } from "../builtIns";
import { ArgDefinition } from "./argument";
import { OperationDefinition } from "./operation";

describe("OperationDefinition", () => {
  const stringArg = new ArgDefinition("key", string);
  test("should be able to create an OperationDefinition", () => {
    expect(() => {
      new OperationDefinition("key", {
        args: [stringArg],
        input: string,
        return: string,
        operation: (input, {}) => input,
      });
    }).not.toThrow();
  });
});
