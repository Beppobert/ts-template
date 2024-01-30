import { Pattern } from "./pattern";

export class TypeDefinition<
  const Key extends string = string,
  const TReturn = any,
  const pattern extends Pattern = Pattern
> {
  _infer: TReturn = null as never;
  definition: {
    validate: (input: unknown) => boolean;
    parse: (value: string) => TReturn;
    pattern: pattern;
  };
  constructor(
    public key: Key,
    definition: {
      validate: (input: unknown) => boolean;
      parse: (value: string) => TReturn;
      pattern?: pattern;
    }
  ) {
    this.definition = {
      validate: (i) => definition.validate(i),
      parse: (value: string) => definition.parse(value),
      pattern: definition.pattern ?? (new Pattern() as pattern),
    };
  }
}

export type PatternOf<T extends TypeDefinition> = T["definition"]["pattern"];
