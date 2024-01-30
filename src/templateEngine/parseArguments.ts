import { ArgDefinition } from "../definitions/argument";
import { Schema } from "../definitions/schema";
import { ParserError } from "./error";

export function parseArguments<TSchema extends Schema>(
  operationTemplateString: string,
  argsDefinition: ArgDefinition[],
  schema: TSchema
): Record<string, unknown> {
  const res: { key: string; value: unknown }[] = [];
  const args = getArgsFromOperationTemplate(
    operationTemplateString,
    argsDefinition.length
  );
  if (args.length !== argsDefinition.length) {
    throw new ParserError(
      "ARGUMENT_PARSE_ERROR",
      "Invalid number of arguments"
    );
  }
  const schemaTypes = schema["types"];
  for (let i = 0; i < argsDefinition.length; i++) {
    const definition = argsDefinition[i]!;
    const argString = args[i]!;
    const type = schemaTypes[definition.type.key];
    if (!type) {
      throw new ParserError(
        "ARGUMENT_PARSE_ERROR",
        `${definition.type.key} was not found in schema types`
      );
    }
    if (type.definition.pattern.regex.test(argString) === false) {
      throw new ParserError(
        "ARGUMENT_PARSE_ERROR",
        `Invalid value: ${argString} for type: ${definition.type.key}. Expected pattern: ${type.definition.pattern.regex}`
      );
    }
    let sanatized = argString.match(type.definition.pattern.regex)?.at(-1);

    if (!sanatized) {
      throw new ParserError(
        "ARGUMENT_PARSE_ERROR",
        `Invalid value: ${argString} for type: ${definition.type.key}. Expected pattern: ${type.definition.pattern.regex}. Matched: ${sanatized}.
        We are using the last match of the regex. If you debug this issuse, try arg.match(${type.definition.pattern.regex})?.at(-1) to see the match.

        `
      );
    }
    const parsedValue = type.definition.parse(sanatized);

    if (!type.definition.validate(parsedValue)) {
      throw new ParserError(
        "ARGUMENT_PARSE_ERROR",
        `Invalid value: ${argString} for type: ${definition.type.key}. validate failed.`
      );
    }
    res.push({ key: definition.key, value: parsedValue });
  }
  return res.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
}

function getArgsFromOperationTemplate(
  operationTemplateString: string,
  maxArgs: number
): string[] {
  const parenthesisIndex = operationTemplateString.indexOf("(");
  if (parenthesisIndex === -1) return [];
  if (!operationTemplateString.endsWith(")")) {
    throw new ParserError(
      "ARGUMENT_PARSE_ERROR",
      `Missing closing parenthesis in operation: ${operationTemplateString}`
    );
  }

  const args = operationTemplateString.substring(
    parenthesisIndex + 1,
    operationTemplateString.length - 1
  );
  return args.split(",", maxArgs);
}
