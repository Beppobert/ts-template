/**
 * @param I - a string literal
 * @param B - a string literal
 * @returns true if I is a substring of B, false otherwise
 * @example
 * type T = "fo"
 * type T1 = "foo"
 * type T2 = "buzz"
 * type T3 = "fizzBuzz"
 * type Result = HasPartialMatch<T, T1>; // true
 * type Result1 = HasPartialMatch<T, T2>; // false
 * type Result2 = HasPartialMatch<T, T3>; // false
 * type Result3 = HasPartialMatch<T2, T3>; // false
 *
 *
 */
export type HasPartialMatch<I extends string, B extends string> = [
  B & `${I}${string}`
] extends [`${infer A}`]
  ? [A] extends [never]
    ? false
    : true
  : false;

/**
 * @param I - a string literal
 * @param B - a string literal
 * @returns true if I and B are the same string literal, false otherwise
 *
 */
export type HasExactMatch<I extends string, B extends string> = [I] extends [B]
  ? [B] extends [I]
    ? true
    : false
  : false;

export type Split<
  T extends string,
  TSplit extends string,
  TAgg extends string[] = []
> = T extends `${infer First}${TSplit}${infer Rest}`
  ? Split<Rest, TSplit, [...TAgg, First]>
  : [...TAgg, T];
