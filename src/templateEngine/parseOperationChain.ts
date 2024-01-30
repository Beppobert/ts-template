import { OperationDefinition } from "../definitions/operation";
import { Schema } from "../definitions/schema";
import { TypeDefinition } from "../definitions/type";
import { hasKey } from "../ts-utils/isKeyof";
import { ParserError } from "./error";
import { parseArguments } from "./parseArguments";

export type ParsedOperation = {
  operation: OperationDefinition;
  args: Record<string, unknown>;
};

export function parseOperations(
  operations: string[],
  type: TypeDefinition,
  schema: Schema
) {
  const operationChain: ParsedOperation[] = [];
  let inputType = type;
  for (let i = 0; i < operations.length; i++) {
    const plainOperationString = operations[i]!;
    const parsed = parseOperation(plainOperationString, inputType, schema);
    operationChain.push(parsed);
    inputType = parsed.operation.definition.return;
  }
  return operationChain;
}

export function composeOperation(operations: ParsedOperation[]) {
  return operations.reduce(
    (fn, parsed) => (input: unknown) => {
      const out = fn(input);
      const isValid =
        parsed.operation.definition.input.definition.validate(out);
      if (!isValid)
        throw new ParserError(
          "TEMPLATE_EXECUTION_ERROR",
          `Input for ${parsed.operation.key} invalid. Expected:${parsed.operation.definition.input.key}. Received raw: ${out}`
        );
      return parsed.operation.definition.operation(fn(input), parsed.args);
    },
    (input: unknown): unknown => input
  );
}

function getOperationKey(operation: string) {
  const [key] = operation.split("(", 1);
  return key!;
}

function parseOperation(
  operation: string,
  inputType: TypeDefinition,
  schema: Schema
): ParsedOperation {
  const definitionsByKeyForInputType = schema.operationsByInput[inputType.key];
  if (!definitionsByKeyForInputType) {
    throw new ParserError(
      "OPERATION_PARSE_ERROR",
      `No operations found for type: ${inputType.key}. Received: ${operation}.`
    );
  }
  const key = getOperationKey(operation);
  if (!hasKey(definitionsByKeyForInputType, key)) {
    throw new ParserError(
      "OPERATION_PARSE_ERROR",
      `Operation ${key} does not exist for type: ${inputType.key}.`
    );
  }
  const definition = definitionsByKeyForInputType[key]!;
  const args = parseArguments(operation, definition.definition.args, schema);
  return { operation: definition, args };
}
