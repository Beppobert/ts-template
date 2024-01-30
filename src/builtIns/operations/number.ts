import { ArgDefinition } from "../../definitions/argument";
import { OperationDefinition } from "../../definitions/operation";
import { number, string } from "../types/types";

export const toExponential = new OperationDefinition("toExponential", {
  args: [new ArgDefinition("fractionDigits", number)],
  operation: (_, { fractionDigits }) => _.toExponential(fractionDigits),
  input: number,
  return: string,
});

export const toFixed = new OperationDefinition("toFixed", {
  args: [new ArgDefinition("fractionDigits", number)],
  operation: (_, { fractionDigits }) => _.toFixed(fractionDigits),
  input: number,
  return: string,
});

export const toPrecision = new OperationDefinition("toPrecision", {
  args: [new ArgDefinition("precision", number)],
  operation: (_, { precision }) => _.toPrecision(precision),
  input: number,
  return: string,
});

export const numberToString = new OperationDefinition("numberToString", {
  args: [new ArgDefinition("radix", number)],
  operation: (_, { radix }) => _.toString(radix),
  input: number,
  return: string,
});

export const add = new OperationDefinition("add", {
  args: [new ArgDefinition("value", number)],
  operation: (_, { value }) => _ + value,
  input: number,
  return: number,
});

export const subtract = new OperationDefinition("subtract", {
  args: [new ArgDefinition("value", number)],
  operation: (_, { value }) => _ + value,
  input: number,
  return: number,
});

export const multiply = new OperationDefinition("multiply", {
  args: [new ArgDefinition("value", number)],
  operation: (_, { value }) => _ + value,
  input: number,
  return: number,
});

export const divide = new OperationDefinition("divide", {
  args: [new ArgDefinition("value", number)],
  operation: (_, { value }) => _ + value,
  input: number,
  return: number,
});

export const root = new OperationDefinition("root", {
  args: [new ArgDefinition("value", number)],
  operation: (_, { value }) => Math.pow(_, 1 / value),
  input: number,
  return: number,
});

export const power = new OperationDefinition("power", {
  args: [new ArgDefinition("value", number)],
  operation: (_, { value }) => Math.pow(_, value),
  input: number,
  return: number,
});

export const log = new OperationDefinition("log", {
  args: [new ArgDefinition("value", number)],
  operation: (_, { value }) => Math.log(value) / Math.log(_),
  input: number,
  return: number,
});

export const log10 = new OperationDefinition("log10", {
  args: [],
  operation: (_) => Math.log10(_),
  input: number,
  return: number,
});

export const log2 = new OperationDefinition("log2", {
  args: [],
  operation: (_) => Math.log2(_),
  input: number,
  return: number,
});

export const log1p = new OperationDefinition("log1p", {
  args: [],
  operation: (_) => Math.log1p(_),
  input: number,
  return: number,
});

export const exp = new OperationDefinition("exp", {
  args: [],
  operation: (_) => Math.exp(_),
  input: number,
  return: number,
});

export const expm1 = new OperationDefinition("expm1", {
  args: [],
  operation: (_) => Math.expm1(_),
  input: number,
  return: number,
});

export const sin = new OperationDefinition("sin", {
  args: [],
  operation: (_) => Math.sin(_),
  input: number,
  return: number,
});

export const cos = new OperationDefinition("cos", {
  args: [],
  operation: (_) => Math.cos(_),
  input: number,
  return: number,
});

export const tan = new OperationDefinition("tan", {
  args: [],
  operation: (_) => Math.tan(_),
  input: number,
  return: number,
});

export const asin = new OperationDefinition("asin", {
  args: [],
  operation: (_) => Math.asin(_),
  input: number,
  return: number,
});

export const acos = new OperationDefinition("acos", {
  args: [],
  operation: (_) => Math.acos(_),
  input: number,
  return: number,
});

export const atan = new OperationDefinition("atan", {
  args: [],
  operation: (_) => Math.atan(_),
  input: number,
  return: number,
});

export const atan2 = new OperationDefinition("atan2", {
  args: [new ArgDefinition("value", number)],
  operation: (_, { value }) => Math.atan2(_, value),
  input: number,
  return: number,
});

export const sinh = new OperationDefinition("sinh", {
  args: [],
  operation: (_) => Math.sinh(_),
  input: number,
  return: number,
});

export const cosh = new OperationDefinition("cosh", {
  args: [],
  operation: (_) => Math.cosh(_),
  input: number,
  return: number,
});

export const tanh = new OperationDefinition("tanh", {
  args: [],
  operation: (_) => Math.tanh(_),
  input: number,
  return: number,
});

export const asinh = new OperationDefinition("asinh", {
  args: [],
  operation: (_) => Math.asinh(_),
  input: number,
  return: number,
});

export const acosh = new OperationDefinition("acosh", {
  args: [],
  operation: (_) => Math.acosh(_),
  input: number,
  return: number,
});

export const atanh = new OperationDefinition("atanh", {
  args: [],
  operation: (_) => Math.atanh(_),
  input: number,
  return: number,
});

export const trunc = new OperationDefinition("trunc", {
  args: [],
  operation: (_) => Math.trunc(_),
  input: number,
  return: number,
});

export const sign = new OperationDefinition("sign", {
  args: [],
  operation: (_) => Math.sign(_),
  input: number,
  return: number,
});

export const cbrt = new OperationDefinition("cbrt", {
  args: [],
  operation: (_) => Math.cbrt(_),
  input: number,
  return: number,
});

export const ceil = new OperationDefinition("ceil", {
  args: [],
  operation: (_) => Math.ceil(_),
  input: number,
  return: number,
});

export const floor = new OperationDefinition("floor", {
  args: [],
  operation: (_) => Math.floor(_),
  input: number,
  return: number,
});

export const round = new OperationDefinition("round", {
  args: [],
  operation: (_) => Math.round(_),
  input: number,
  return: number,
});

export const imul = new OperationDefinition("imul", {
  args: [new ArgDefinition("value", number)],
  operation: (_, { value }) => Math.imul(_, value),
  input: number,
  return: number,
});

export const fround = new OperationDefinition("fround", {
  args: [],
  operation: (_) => Math.fround(_),
  input: number,
  return: number,
});

export const clz32 = new OperationDefinition("clz32", {
  args: [],
  operation: (_) => Math.clz32(_),
  input: number,
  return: number,
});

export const random = new OperationDefinition("random", {
  args: [],
  operation: (_) => Math.random(),
  input: number,
  return: number,
});

export const abs = new OperationDefinition("abs", {
  args: [],
  operation: (_) => Math.abs(_),
  input: number,
  return: number,
});

export const max = new OperationDefinition("max", {
  args: [new ArgDefinition("value", number)],
  operation: (_, { value }) => Math.max(_, value),
  input: number,
  return: number,
});

export const min = new OperationDefinition("min", {
  args: [new ArgDefinition("value", number)],
  operation: (_, { value }) => Math.min(_, value),
  input: number,
  return: number,
});

export const hypot = new OperationDefinition("hypot", {
  args: [new ArgDefinition("value", number)],
  operation: (_, { value }) => Math.hypot(_, value),
  input: number,
  return: number,
});

export const sqrt = new OperationDefinition("sqrt", {
  args: [],
  operation: (_) => Math.sqrt(_),
  input: number,
  return: number,
});

export const square = new OperationDefinition("square", {
  args: [],
  operation: (_) => Math.pow(_, 2),
  input: number,
  return: number,
});
