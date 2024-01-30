import { Head, IfNotEmpty, Tail } from "../ts-utils/array";
import { Err, Ok } from "../ts-utils/domain";
import { PatternOf, TypeDefinition } from "./type";

export class ArgDefinition<
  const Key extends string = string,
  const Type extends TypeDefinition = TypeDefinition
> {
  constructor(public key: Key, public type: Type) {}
}

export type ValidateArg<
  Arg extends string,
  Definition extends ArgDefinition // source of truth
> = Arg extends PatternOf<Definition["type"]>["_infer"]
  ? Ok<Arg>
  : Ok<PatternOf<Definition["type"]>["_inferFallBack"]>;

export type ValidateArgs<
  Args extends string[],
  Definitions extends ArgDefinition[], // source of truth
  $agg extends (Ok | Err)[] = []
> = Definitions extends [
  infer First extends ArgDefinition,
  ...infer Rest extends ArgDefinition[]
]
  ? ValidateArgs<
      Tail<Args>,
      Rest,
      [
        ...$agg,
        ValidateArg<Head<Args, string, "">, First>,
        ...IfNotEmpty<Rest, [Ok<",">]>
      ]
    >
  : $agg;
