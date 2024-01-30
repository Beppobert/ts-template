export function hasKey<T extends string, const Keys extends string[]>(
  obj: Record<T, unknown>,
  ...keys: Keys
): obj is T & Record<Keys[number], unknown> {
  return (
    obj !== null && typeof obj === "object" && keys.every((key) => key in obj)
  );
}
