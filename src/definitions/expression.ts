import { IfNotEmpty } from "../ts-utils/array";
import { Err, Ok } from "../ts-utils/domain";
import { Split } from "../ts-utils/string";
import { ValidateOperations } from "./operation";
import { Schema } from "./schema";
import { AutoComplete, Rebuild } from "./utils";

export type ExpressionDetails<
  T extends string,
  TSchema extends Schema
> = T extends `${infer Key}#${infer Type}|${infer Operations}`
  ? {
      key: Key extends `?${infer K}` ? K : Key;
      type: AutoComplete<Type, keyof TSchema["types"] & string>;
      isOptional: Key extends `?${string}` ? true : false;
      operations: Split<Operations, "|">;
    }
  : T extends `${infer Key}#${infer Type}`
  ? {
      key: Key extends `?${infer K}` ? K : Key;
      isOptional: Key extends `?${string}` ? true : false;
      type: AutoComplete<Type, keyof TSchema["types"] & string>;
      operations: [];
    }
  : T extends `${infer Key}|${infer Operations}`
  ? {
      key: Key extends `?${infer K}` ? K : Key;
      isOptional: Key extends `?${string}` ? true : false;
      type: null;
      operations: Split<Operations, "|">;
    }
  : {
      key: T extends `?${infer K}` ? K : T;
      isOptional: T extends `?${string}` ? true : false;
      type: null;
      operations: [];
    };

export type Expression<
  T extends string,
  TSchema extends Schema
> = ExpressionDetails<T, TSchema> extends any
  ? [
      ExpressionDetails<T, TSchema>["isOptional"] extends true
        ? Ok<"?">
        : Ok<"">,
      Ok<ExpressionDetails<T, TSchema>["key"]>,
      ...(ExpressionDetails<T, TSchema>["type"] extends keyof TSchema["types"] &
        string
        ? [Ok<"#">, Ok<ExpressionDetails<T, TSchema>["type"]>]
        : []),

      ...IfNotEmpty<
        ExpressionDetails<T, TSchema>["operations"],
        [
          Ok<"|">,
          ...ValidateOperations<
            ExpressionDetails<T, TSchema>["operations"],
            ExpressionDetails<T, TSchema>["type"] extends keyof TSchema["types"]
              ? TSchema["types"][ExpressionDetails<T, TSchema>["type"]]
              : TSchema["types"]["DEFAULT"],
            TSchema
          >
        ]
      >
    ]
  : never;

export type ValidateTemplate<
  Input extends string,
  TSchema extends Schema,
  $agg extends (Ok | Err)[] = []
> = Input extends `${infer Start}{{${infer TemplateKey}}}${infer Rest}`
  ? ValidateTemplate<
      Rest,
      TSchema,
      [
        ...$agg,
        Ok<Start>,
        Ok<"{{">,
        ...Expression<TemplateKey, TSchema>,
        Ok<"}}">
      ]
    >
  : Input extends `${infer Start}{{${infer TemplateKey}`
  ? ValidateTemplate<
      "",
      TSchema,
      [...$agg, Ok<Start>, Ok<"{{">, ...Expression<TemplateKey, TSchema>]
    >
  : Rebuild<[...$agg, Ok<Input>]>;
