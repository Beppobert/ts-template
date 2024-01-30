export type ErrorMsg<Msg extends string> = `[Error:${Msg}]`;

export type Ok<T extends string = string> = {
  tag: "Ok";
  value: T;
  error: never;
};
export type Err<Msg extends string = string> = {
  tag: "Err";
  error: ErrorMsg<Msg>;
  value: never;
};
