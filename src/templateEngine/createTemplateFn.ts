import { ExpressionDetails, ValidateTemplate } from "../definitions/expression";
import { Schema } from "../definitions/schema";
import { TypeDefinition } from "../definitions/type";
import { ParserError } from "./error";
import { composeOperation } from "./parseOperationChain";
import { parseTemplateValue } from "./parseTemplateValue";

export function createTemplateFn<
  const Template extends string,
  TSchema extends Schema
>(
  template: ValidateTemplate<Template, TSchema>,
  schema: TSchema
): (params: Params<Template, TSchema>) => string {
  if (typeof template !== "string")
    throw new ParserError(
      "TEMPLATE_PARSE_ERROR",
      "Provided Template is not a string. Received: " + typeof template
    );
  const handler = templateValueHandler(template, schema);
  return (params) => replace(template, params, handler);
}

export function template<const TSchema extends Schema>(schema: TSchema) {
  return <const Template extends string>(
    template: ValidateTemplate<Template, TSchema>
  ) => createTemplateFn<Template, TSchema>(template, schema);
}

function templateValueHandler(template: string, schema: Schema) {
  const matches = template.match(/{{.*?}}/g) ?? [];
  const chains = matches.map((m) => {
    const k = m.trim().slice(2, -2);
    const { key, isOptional, operations } = parseTemplateValue(k, schema);
    return {
      key,
      isOptional,
      composedOperations: composeOperation(operations),
    };
  });
  return chains;
}

function replace(
  template: string,
  params: Record<string, unknown>,
  handler: {
    key: string;
    isOptional: boolean;
    composedOperations: (replaceValue: unknown) => unknown;
  }[]
) {
  let i = 0;
  return template.replace(/{{.*?}}/g, (value) => {
    const { key, composedOperations, isOptional } = handler[i++]!;
    const replaceValue = params[key as keyof typeof params];
    if (replaceValue === undefined && isOptional) return "";
    if (replaceValue === undefined) {
      throw new ParserError(
        "TEMPLATE_EXECUTION_ERROR",
        `Error while replacing "${value}". Required parameter "${key}" is missing in params.`
      );
    }
    return `${composedOperations(replaceValue)}`;
  });
}

export type Params<
  Input extends string,
  TSchema extends Schema,
  $params extends Record<string, any> = {}
> = Input extends `${string}{{${infer TemplateKey}}}${infer Rest}`
  ? ExpressionDetails<
      TemplateKey,
      TSchema
    >["type"] extends keyof TSchema["types"]
    ? Params<
        Rest,
        TSchema,
        MergeParams<
          $params,
          ExpressionDetails<TemplateKey, TSchema>["key"],
          TSchema["types"][ExpressionDetails<TemplateKey, TSchema>["type"]],
          ExpressionDetails<TemplateKey, TSchema>["isOptional"]
        >
      >
    : Params<
        Rest,
        TSchema,
        MergeParams<
          $params,
          ExpressionDetails<TemplateKey, TSchema>["key"],
          TSchema["types"]["DEFAULT"],
          ExpressionDetails<TemplateKey, TSchema>["isOptional"]
        >
      >
  : $params;

type MergeParams<
  $params extends Record<string, any>,
  TemplateKey extends string,
  Type extends TypeDefinition,
  isOptional extends boolean
> = (isOptional extends true
  ? {
      [K in TemplateKey]?: ReturnType<Type["definition"]["parse"]>;
    }
  : {
      [K in TemplateKey]: ReturnType<Type["definition"]["parse"]>;
    }) &
  $params;
