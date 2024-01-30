import { Err, Ok } from "../ts-utils/domain";

export type Rebuild<
  T extends (Ok | Err)[],
  TAgg extends string = ""
> = T extends [infer Head extends Ok | Err, ...infer Tail extends (Ok | Err)[]]
  ? Head extends Err
    ? Rebuild<[], `${TAgg}${Head["error"]}`>
    : Rebuild<Tail, `${TAgg}${Head["value"]}`>
  : TAgg;

export type AutoComplete<I extends string, Options extends string> = [
  `${I}${string}` & Options
] extends [never]
  ? Options
  : Options & `${I}${string}`;
