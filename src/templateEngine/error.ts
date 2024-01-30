type Errors =
  | "ARGUMENT_PARSE_ERROR"
  | "SCHEMA_VALIDATION_ERROR"
  | "OPERATION_PARSE_ERROR"
  | "TEMPLATE_PARSE_ERROR"
  | "TEMPLATE_EXECUTION_ERROR";

export class ParserError extends Error {
  constructor(
    public name: Errors,
    public message: string,
    public cause?: Error
  ) {
    super(`[${name}]: ${message}`);
  }
}

export function isParserError(e: unknown): e is ParserError {
  return e instanceof ParserError;
}
