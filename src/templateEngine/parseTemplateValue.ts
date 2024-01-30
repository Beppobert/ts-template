import { Schema } from "../definitions/schema";
import { ParserError } from "./error";
import { parseOperations } from "./parseOperationChain";

export function parseTemplateValue(k: string, schema: Schema) {
  const [def, ...operations] = k.split("|");
  const [key, type] = def?.split("#", 2) ?? [null, null];
  if (!key) {
    throw new ParserError(
      "TEMPLATE_PARSE_ERROR",
      "Invalid template value: " + k
    );
  }
  const isOptional = key.startsWith("?");
  const templateKey = isOptional ? key.slice(1) : key;
  let inputType = type ? schema.types[type] : null;
  inputType ??= schema.types.DEFAULT;
  return {
    key: templateKey,
    isOptional,
    operations: parseOperations(operations, inputType, schema),
  };
}
