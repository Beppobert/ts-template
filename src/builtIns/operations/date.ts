import { ArgDefinition } from "../../definitions/argument";
import { OperationDefinition } from "../../definitions/operation";
import { date, number, string } from "../types/types";

export const dateToNumber = new OperationDefinition("dateToNumber", {
  args: [],
  operation: (_) => _.getTime(),
  input: date,
  return: number,
});

export const toDateString = new OperationDefinition("toDateString", {
  args: [],
  operation: (_) => _.toDateString(),
  input: date,
  return: string,
});

export const toISOString = new OperationDefinition("toISOString", {
  args: [],
  operation: (_) => _.toISOString(),
  input: date,
  return: string,
});

export const toJSON = new OperationDefinition("toJSON", {
  args: [],
  operation: (_) => _.toJSON(),
  input: date,
  return: string,
});

export const toLocaleDateString = new OperationDefinition(
  "toLocaleDateString",
  {
    args: [new ArgDefinition("locales", string)],
    operation: (_, { locales }) => _.toLocaleDateString(locales),
    input: date,
    return: string,
  }
);

export const toLocaleString = new OperationDefinition("toLocaleString", {
  args: [new ArgDefinition("locales", string)],
  operation: (_, { locales }) => _.toLocaleString(locales),
  input: date,
  return: string,
});

export const toLocaleTimeString = new OperationDefinition(
  "toLocaleTimeString",
  {
    args: [new ArgDefinition("locales", string)],
    operation: (_, { locales }) => _.toLocaleTimeString(locales),
    input: date,
    return: string,
  }
);

export const dateToString = new OperationDefinition("dateToString", {
  args: [],
  operation: (_) => _.toString(),
  input: date,
  return: string,
});

export const toTimeString = new OperationDefinition("toTimeString", {
  args: [],
  operation: (_) => _.toTimeString(),
  input: date,
  return: string,
});

export const toUTCString = new OperationDefinition("toUTCString", {
  args: [],
  operation: (_) => _.toUTCString(),
  input: date,
  return: string,
});

export const getDay = new OperationDefinition("getDay", {
  args: [],
  operation: (_) => _.getDay(),
  input: date,
  return: number,
});

export const getDate = new OperationDefinition("getDate", {
  args: [],
  operation: (_) => _.getDate(),
  input: date,
  return: number,
});

export const getFullYear = new OperationDefinition("getFullYear", {
  args: [],
  operation: (_) => _.getFullYear(),
  input: date,
  return: number,
});

export const getHours = new OperationDefinition("getHours", {
  args: [],
  operation: (_) => _.getHours(),
  input: date,
  return: number,
});

export const getMilliseconds = new OperationDefinition("getMilliseconds", {
  args: [],
  operation: (_) => _.getMilliseconds(),
  input: date,
  return: number,
});

export const getMinutes = new OperationDefinition("getMinutes", {
  args: [],
  operation: (_) => _.getMinutes(),
  input: date,
  return: number,
});

export const getMonth = new OperationDefinition("getMonth", {
  args: [],
  operation: (_) => _.getMonth(),
  input: date,
  return: number,
});

export const getSeconds = new OperationDefinition("getSeconds", {
  args: [],
  operation: (_) => _.getSeconds(),
  input: date,
  return: number,
});

export const getTime = new OperationDefinition("getTime", {
  args: [],
  operation: (_) => _.getTime(),
  input: date,
  return: number,
});

export const getTimezoneOffset = new OperationDefinition("getTimezoneOffset", {
  args: [],
  operation: (_) => _.getTimezoneOffset(),
  input: date,
  return: number,
});

export const getUTCDate = new OperationDefinition("getUTCDate", {
  args: [],
  operation: (_) => _.getUTCDate(),
  input: date,
  return: number,
});

export const getUTCFullYear = new OperationDefinition("getUTCFullYear", {
  args: [],
  operation: (_) => _.getUTCFullYear(),
  input: date,
  return: number,
});

export const getUTCHours = new OperationDefinition("getUTCHours", {
  args: [],
  operation: (_) => _.getUTCHours(),
  input: date,
  return: number,
});

export const getUTCMilliseconds = new OperationDefinition(
  "getUTCMilliseconds",
  {
    args: [],
    operation: (_) => _.getUTCMilliseconds(),
    input: date,
    return: number,
  }
);

export const getUTCMinutes = new OperationDefinition("getUTCMinutes", {
  args: [],
  operation: (_) => _.getUTCMinutes(),
  input: date,
  return: number,
});

export const getUTCMonth = new OperationDefinition("getUTCMonth", {
  args: [],
  operation: (_) => _.getUTCMonth(),
  input: date,
  return: number,
});

export const getUTCSeconds = new OperationDefinition("getUTCSeconds", {
  args: [],
  operation: (_) => _.getUTCSeconds(),
  input: date,
  return: number,
});

export const mmddyyyy = new OperationDefinition("mmddyyyy", {
  args: [new ArgDefinition("separator", string)],
  operation: (_, { separator }) =>
    `${
      _.getMonth() + 1
    }${separator}${_.getDate()}${separator}${_.getFullYear()}`,
  input: date,
  return: string,
});

export const ddmmyyyy = new OperationDefinition("ddmmyyyy", {
  args: [new ArgDefinition("separator", string)],
  operation: (_, { separator }) =>
    `${_.getDate()}${separator}${
      _.getMonth() + 1
    }${separator}${_.getFullYear()}`,
  input: date,
  return: string,
});

export const ddyyyymm = new OperationDefinition("ddyyyymm", {
  args: [new ArgDefinition("separator", string)],
  operation: (_, { separator }) =>
    `${_.getDate()}${separator}${_.getFullYear()}${separator}${
      _.getMonth() + 1
    }`,
  input: date,
  return: string,
});

export const yyyyddmm = new OperationDefinition("yyyyddmm", {
  args: [new ArgDefinition("separator", string)],
  operation: (_, { separator }) =>
    `${_.getFullYear()}${separator}${_.getDate()}${separator}${
      _.getMonth() + 1
    }`,
  input: date,
  return: string,
});
