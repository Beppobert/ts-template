export class Pattern<
  const pattern extends string = string,
  const Fallback extends string = string
> {
  _infer: pattern = null as never;
  _inferFallBack: Fallback = null as never;
  public regex: RegExp;
  constructor(regex?: RegExp, fallback: Fallback = "" as Fallback) {
    this.regex = regex ?? /.+/;
    this._inferFallBack = fallback;
  }
}
