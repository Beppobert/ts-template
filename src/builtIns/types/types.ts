import { Pattern } from "../../definitions/pattern";
import { TypeDefinition } from "../../definitions/type";

export const string = new TypeDefinition("string", {
  parse: (value): string => value,
  validate: (input) => typeof input === "string",
  pattern: new Pattern<`"${string}"`, '""'>(/^\"(.*)\"$/),
});

export const number = new TypeDefinition("number", {
  parse: (value): number => Number(value),
  validate: (input) => typeof input === "number" && !isNaN(input),
  pattern: new Pattern<`${number}`, "0">(/^(\d+\.{0,1}\d*)$/),
});

export const date = new TypeDefinition("date", {
  parse: (value): Date => new Date(value),
  validate: (input) => input instanceof Date && !isNaN(input.getTime()),
  pattern: new Pattern<string, "1970/01/30">(/^(\d{1,2}\/\d{1,2}\/\d{4})$/),
});
