export type IfNotEmpty<T, True, False = []> = T extends [] | never[]
  ? False
  : True;

export type Head<T, Extends, Default> = T extends [
  infer Head extends Extends,
  ...string[]
]
  ? Head
  : Default;

export type Tail<T> = T extends [any, ...infer Tail] ? Tail : [];

export function groupBy<T>(items: T[], by: (item: T) => string) {
  const result: Record<string, T[]> = {};
  for (const item of items) {
    const key = by(item);
    result[key] ??= [];
    result[key]!.push(item);
  }
  return result;
}

export function keyBy<T>(items: T[], by: (item: T) => string) {
  const result: Record<string, T> = {};
  for (const item of items) {
    const key = by(item);
    result[key] = item;
  }
  return result;
}
