import { describe, expect, test } from "vitest";
import { number, string } from "../builtIns";
import { ParserError } from "../templateEngine/error";
import { OperationDefinition } from "./operation";
import { createSchema } from "./schema";

describe("Schema", () => {
  test("should throw if an operation uses a wrong input type", () => {
    expect(() =>
      createSchema(
        { types: [string], defaultType: "string" },
        {
          string: [
            //@ts-expect-error - number is not defined in the schema
            new OperationDefinition("key", {
              args: [],
              input: number,
              return: string,
              operation: () => {},
            }),
          ],
        }
      )
    ).toThrowError(
      new ParserError(
        "SCHEMA_VALIDATION_ERROR",
        `The operation key uses the input-type: number but the input-type: string was specified in the schema`
      ).message
    );
  });

  test("should throw if an operation uses an unspecified type", () => {
    expect(() =>
      createSchema(
        { types: [string], defaultType: "string" },
        {
          string: [
            new OperationDefinition("key", {
              args: [],
              return: number,
              input: string,
              operation: () => {},
            }),
          ],
        }
      )
    ).toThrowError(
      new ParserError(
        "SCHEMA_VALIDATION_ERROR",
        `The operation key returns the type number but the type was not specified in the schema`
      ).message
    );
  });

  test("should throw if an operation uses an unspecified type", () => {
    expect(() =>
      createSchema(
        { types: [string], defaultType: "string" },
        {
          //@ts-expect-error - number is not defined in the schema
          number: [
            new OperationDefinition("key", {
              args: [],
              return: number,
              input: string,
              operation: () => {},
            }),
          ],
        }
      )
    ).toThrowError(
      new ParserError(
        "SCHEMA_VALIDATION_ERROR",
        `The type number was used in an operation but not defined in the schema`
      ).message
    );
  });
  test("should throw if the default type was not specified", () => {
    expect(() =>
      createSchema(
        { types: [string], defaultType: null as any as "string" },
        //@ts-expect-error - empty operations
        {}
      )
    ).toThrowError(
      new ParserError(
        "SCHEMA_VALIDATION_ERROR",
        `The default type null was not found in the schema`
      ).message
    );
  });
});
