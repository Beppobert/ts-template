import { IfNotEmpty } from "../ts-utils/array";
import { Err, Ok } from "../ts-utils/domain";
import { Split } from "../ts-utils/string";
import { ArgDefinition, ValidateArgs } from "./argument";
import { Schema } from "./schema";
import { TypeDefinition } from "./type";

type ArgDefintionToOperationInput<Args extends ArgDefinition[]> = {
  [K in Args[number]["key"]]: (Args[number] & { key: K })["type"]["_infer"];
};
export class OperationDefinition<
  const Key extends string = string,
  const Args extends ArgDefinition[] = any,
  const InputType extends TypeDefinition = TypeDefinition,
  const ReturnType extends TypeDefinition = TypeDefinition
> {
  constructor(
    public key: Key,
    public definition: {
      args: Args;
      input: InputType;
      return: ReturnType;
      operation: (
        input: InputType["_infer"],
        args: ArgDefintionToOperationInput<Args>
      ) => any;
    }
  ) {}
}

export type Details<Input extends string> =
  Input extends `${infer Key}(${infer Args})`
    ? { key: Key; args: Split<Args, ","> }
    : Input extends `${infer Key}(${infer Args}`
    ? { key: Key; args: Split<Args, ","> }
    : { key: Input; args: [] };

type AutoComplete<
  I extends string,
  InputType extends TypeDefinition,
  TSchema extends Schema,
  $options = keyof TSchema["operationsByInput"][InputType["key"]] & string
> = [`${I}${string}` & $options] extends [never]
  ? never
  : $options & `${I}${string}`;

/**returns union of possibilities*/
export type OperationDetails<
  Input extends string,
  InputType extends TypeDefinition,
  TSchema extends Schema
> = AutoComplete<
  Details<Input>["key"],
  InputType,
  TSchema
> extends infer Key extends keyof TSchema["operationsByInput"][InputType["key"]] &
  string
  ? Key extends any
    ? {
        key: Details<Input>["key"];
        args: Details<Input>["args"];
        predictedKey: Key;
        argsDefinition: TSchema["operationsByInput"][InputType["key"]][Key]["definition"]["args"];
        returnDefinition: TSchema["operationsByInput"][InputType["key"]][Key]["definition"]["return"];
      }
    : never
  : never;

type ApplyOperationDetails<
  T extends {
    key: string;
    args: string[];
    predictedKey: string;
    argsDefinition: ArgDefinition[];
    returnDefinition: TypeDefinition;
  },
  $agg extends (Ok | Err)[]
> = T extends any
  ? [
      ...IfNotEmpty<$agg, [...$agg, Ok<"|">]>,
      Ok<T["predictedKey"]>,
      ...IfNotEmpty<
        T["argsDefinition"],
        [Ok<"(">, ...ValidateArgs<T["args"], T["argsDefinition"]>, Ok<")">]
      >
    ]
  : never;

export type ValidateOperations<
  T extends string[],
  InputType extends TypeDefinition,
  TSchema extends Schema,
  $agg extends (Ok | Err)[] = []
> = T extends [infer First extends string, ...infer Rest extends string[]]
  ? [OperationDetails<First, InputType, TSchema>] extends [never]
    ? [
        ...$agg,
        Err<`${Details<First>["key"]} doesn't exist for input-type:${InputType["key"]}`>
      ]
    : ValidateOperations<
        Rest,
        OperationDetails<First, InputType, TSchema>["returnDefinition"],
        TSchema,
        ApplyOperationDetails<OperationDetails<First, InputType, TSchema>, $agg>
      >
  : $agg;
