import { ArgDefinition } from "../../definitions/argument";
import { OperationDefinition } from "../../definitions/operation";
import { date, number, string } from "../types/types";

export const trim = new OperationDefinition("trim", {
  args: [],
  operation: (_) => _.trim(),
  input: string,
  return: string,
});

export const slice = new OperationDefinition("slice", {
  args: [new ArgDefinition("start", number), new ArgDefinition("end", number)],
  operation: (_, { start, end }) => _.slice(start, end),
  input: string,
  return: string,
});

export const replace = new OperationDefinition("replace", {
  args: [
    new ArgDefinition("searchValue", string),
    new ArgDefinition("replaceValue", string),
  ],
  operation: (_, { replaceValue, searchValue }) =>
    _.replace(searchValue, replaceValue),
  input: string,
  return: string,
});

export const toLower = new OperationDefinition("toLower", {
  args: [],
  operation: (_) => _.toLowerCase(),
  input: string,
  return: string,
});

export const toUpper = new OperationDefinition("toUpper", {
  args: [],
  operation: (_) => _.toUpperCase(),
  input: string,
  return: string,
});

export const capitalize = new OperationDefinition("capitalize", {
  args: [],
  operation: (_) => _.charAt(0).toUpperCase() + _.slice(1),
  input: string,
  return: string,
});

export const repeat = new OperationDefinition("repeat", {
  args: [new ArgDefinition("count", number)],
  operation: (_, { count }) => _.repeat(count),
  input: string,
  return: string,
});

export const padStart = new OperationDefinition("padStart", {
  args: [
    new ArgDefinition("targetLength", number),
    new ArgDefinition("padString", string),
  ],
  operation: (_, { targetLength, padString }) =>
    _.padStart(targetLength, padString),
  input: string,
  return: string,
});

export const padEnd = new OperationDefinition("padEnd", {
  args: [
    new ArgDefinition("targetLength", number),
    new ArgDefinition("padString", string),
  ],
  operation: (_, { targetLength, padString }) =>
    _.padEnd(targetLength, padString),
  input: string,
  return: string,
});

export const truncate = new OperationDefinition("truncate", {
  args: [new ArgDefinition("length", number), new ArgDefinition("end", string)],
  operation: (_, { length, end }) => {
    if (_.length > length) {
      return _.slice(0, length) + end;
    }
    return _;
  },
  input: string,
  return: string,
});

export const toDate = new OperationDefinition("toDate", {
  args: [],
  operation: (_) => new Date(_),
  input: string,
  return: date,
});

export const strToNumber = new OperationDefinition("strToNumber", {
  args: [],
  operation: (_) => Number(_),
  input: string,
  return: number,
});

export const urlEncode = new OperationDefinition("urlEncode", {
  args: [],
  operation: (_) => encodeURIComponent(_),
  input: string,
  return: string,
});

export const urlDecode = new OperationDefinition("urlDecode", {
  args: [],
  operation: (_) => decodeURIComponent(_),
  input: string,
  return: string,
});

export const base64Encode = new OperationDefinition("base64Encode", {
  args: [],
  operation: (_) => Buffer.from(_).toString("base64"),
  input: string,
  return: string,
});

export const base64Decode = new OperationDefinition("base64Decode", {
  args: [],
  operation: (_) => Buffer.from(_, "base64").toString("ascii"),
  input: string,
  return: string,
});

export const length = new OperationDefinition("length", {
  args: [],
  operation: (_) => _.length,
  input: string,
  return: number,
});

// date operations
