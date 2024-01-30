import { ParserError } from "../templateEngine/error";
import { keyBy } from "../ts-utils/array";
import { OperationDefinition } from "./operation";
import { TypeDefinition } from "./type";

type OperationDefinitionInput<T extends TypeDefinition[] = TypeDefinition[]> = {
  [K in T[number]["key"]]: (OperationDefinition & {
    definition: { input: T[number] & { key: K } };
  })[];
};

export type Schema<
  T extends TypeDefinition[] = TypeDefinition[],
  DefaultKey extends T[number]["key"] = string,
  Operations extends OperationDefinitionInput = OperationDefinitionInput
> = {
  types: SchemaTypes<T, DefaultKey>;
  operationsByInput: {
    [K in keyof Operations]: OperationSchema<Operations[K][number]>;
  };
};

type OperationSchema<T extends OperationDefinition> = {
  [K in T["key"]]: T & { key: K };
};

export type SchemaTypes<
  T extends TypeDefinition[],
  DefaultKey extends T[number]["key"]
> = { [K in T[number]["key"]]: T[number] & { key: K } } & {
  DEFAULT: Extract<T[number], { key: DefaultKey }>;
};

export function createSchema<
  const T extends TypeDefinition[],
  const DefaultKey extends T[number]["key"],
  const Operations extends OperationDefinitionInput<T>
>(
  typeSchema: { types: T; defaultType: DefaultKey },
  operations: Operations
): Schema<T, DefaultKey, Operations> {
  const types = schema_types(typeSchema.types, typeSchema.defaultType);
  return {
    types,
    operationsByInput: operation_schema(typeSchema.types, operations),
  };
}

function operation_schema<
  const T extends TypeDefinition[],
  const Operations extends OperationDefinitionInput<T>
>(types: T, operations: Operations) {
  const schema = {} as any;
  const typeByKey = keyBy(types, (type) => type.key);
  for (const typeKey in operations) {
    const type = typeByKey[typeKey];
    if (!type) {
      throw new ParserError(
        "SCHEMA_VALIDATION_ERROR",
        `The type ${typeKey} was used in an operation but not defined in the schema`
      );
    }
    const operationsOnType = operations[typeKey] ?? [];
    schema[typeKey] = keyBy(operationsOnType, (operation) => {
      if (operation.definition.input.key !== typeKey) {
        throw new ParserError(
          "SCHEMA_VALIDATION_ERROR",
          `The operation ${operation.key} uses the input-type: ${operation.definition.input.key} but the input-type: ${typeKey} was specified in the schema.`
        );
      }
      if (!typeByKey[operation.definition.return.key]) {
        throw new ParserError(
          "SCHEMA_VALIDATION_ERROR",
          `The operation ${operation.key} returns the type ${operation.definition.return.key} but the type was not specified in the schema`
        );
      }
      return operation.key;
    });
  }
  return schema;
}

export function schema_types<
  const T extends TypeDefinition[],
  const DefaultKey extends T[number]["key"]
>(typeDefinitions: T, defaultKey: DefaultKey): SchemaTypes<T, DefaultKey> {
  const DEFAULT = typeDefinitions.find((type) => type.key === defaultKey);
  if (!DEFAULT) {
    throw new ParserError(
      "SCHEMA_VALIDATION_ERROR",
      `The default type ${defaultKey} was not found in the schema`
    );
  }
  return Object.assign(
    Object.fromEntries(typeDefinitions.map((v) => [v.key, v])),
    {
      DEFAULT,
    }
  ) as any;
}
