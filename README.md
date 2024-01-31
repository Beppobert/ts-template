# template-ts

This is a small customizable typesafe template engine written in Typescript.

## Setup

## Quickstart

```shell
npm i @beppobert/ts-template
```

```typescript
import {
  TypeDefinition,
  ArgDefinition,
  OperationDefinition,
  Pattern,
  createSchema,
  template,
} from "@beppobert/ts-template";

// create your custom types

const stringType = new TypeDefinition("string", {
  validator: (input: string) => typeof input === "string",
  parseValue: (value): string => value,
  pattern: new Pattern<`"${string}"`, '""'>(/^\"(.*)\"$/),
});
const numberType = new TypeDefinition("number", {
  validator: (input: number) => typeof input === "number",
  parseValue: (value): number => Number(value),
  pattern: new Pattern<`${number}`, "0">(new RegExp(`^${Number}$`)),
});

// create your custom operations

const uppercaseOperation = new OperationDefinition("upper", {
  args: [],
  input: stringType,
  return: stringType,
  operation: (input) => input.toUpperCase(),
});

const replaceOperation = new OperationDefinition("replace", {
  args: [
    new ArgDefinition("searchValue", stringType),
    new ArgDefinition("replaceValue", stringType),
  ],
  input: stringType,
  return: stringType,
  operation: (input, { searchValue, replaceValue }) =>
    input.replace(searchValue, replaceValue),
});

const toString = new OperationDefinition("toString", {
  args: [],
  input: numberType,
  return: stringType,
  operation: (input) => input.toString(),
});

// create your  schema

const schema = createSchema(
  {
    types: [stringType, numberType],
    defaultType: "string",
  },
  {
    // group the operation based on their input type into an object
    string: [uppercaseOperation, replaceOperation],
    number: [toString],
  }
);

// create your template function

const templateFn = template(schema);

const templateString = templateFn("Hello {{name|upper}}"); // enjoy auto completion
```

## Create a custom type

```typescript
import { TypeDefinition, Pattern } from "@beppobert/ts-template";
/***
 * The Pattern class defines a pattern that your string in your arguments has to match
 * The first generic will define the typescript side of your pattern.
 * Any arg of type string will be checked against this type.
 * e.g. {{...|...|replace("a","b")}} <- "a" and "b" have to match the pattern
 *
 * The second generic will define a default value if the pattern doesn't match.
 *
 * The pattern regex will be used to validate your arg string.
 * It's last match should also return the value you want to parse.
 *
 * /
const strPattern = new Pattern<`"${string}"`, '""'>(/^\"(.*)\"$/);

const stringType = new TypeDefinition("string", {
  pattern: strPattern,
  // is called after the parsing step
  validator: (input: string) => typeof input === "string",

  // receives the last match of the pattern regex and must return a value of the desired type
  parseValue: (value): string => value,
});

```

## Create a custom operation

```typescript
import { OperationDefinition, ArgDefinition } from "@beppobert/ts-template";
/**
 * The first argument is the key of your operation.
 * It will be used in your template string to call your operation.
 */
const replace = new OperationDefinition("replace", {
  // define the arguments of your operation
  args: [
    new ArgDefinition("searchValue", stringType),
    new ArgDefinition("replaceValue", stringType),
  ],
  // define the input type of your operation
  input: stringType,
  // define the return type of your operation
  return: stringType,
  // define the operation
  operation: (input, { searchValue, replaceValue }) =>
    input.replace(searchValue, replaceValue),
});
```

## Create a custom schema

The schema runs multiple runtime checks to ensure that your schema is valid.

```typescript
import { createSchema } from "@beppobert/ts-template";

const schema = createSchema(
  {
    // define your types
    types: [stringType, numberType],
    // define your default type
    defaultType: "string",
  },
  {
    // group the operation based on their input type into an object
    string: [uppercaseOperation, replaceOperation],
    number: [toString],
  }
);
```

## Create a custom template function

```typescript
import { template } from "@beppobert/ts-template";

const templateFn = template(schema);
/**
 * A value you want to get replaced needs to be wrapped in {{...}}
 *
 * The first part of the string is the name of the value you want to replace.
 * If the value is optional you can add a ? before the name.
 * e.g. {{?name}} will be replaced with the value of name if it exists
 *
 * The second part of the string is the type of the value.
 * The type is prefixed with #. If it's not prefixed the default type will be used.
 * e.g. {{name#string}} is the same as {{name}} if string is the default type
 *
 * the third part of the string is the operations you want to call on the value.
 * e.g. {{name#string|upper|replace("a","b")}}. The typesytem ensures that after each operation you can only * call operations that are defined for the return type of the previous operation.
 * e.g.{{name#string|upper|toString}} will result in an error
 */
const templateString = templateFn(
  'Hello {{name#string|upper|replace("O","i")}}'
); // enjoy auto completion
templateString({ name: "Bob" }); // Hello BiB

const templateString2 = templateFn("Hello {{name|upper}}");
```
