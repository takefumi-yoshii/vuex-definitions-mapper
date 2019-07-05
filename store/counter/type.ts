// ______________________________________________________
//
export type S = {
  count: number
}
// ______________________________________________________
//
export type G = {
  double: number
  expo2: number
  expo: (amount: number) => number
}
// ______________________________________________________
//
export type M = {
  setCount: { amount: number }
  multi: number
  increment: void
  decrement: void
}
// ______________________________________________________
//
export type A = {
  asyncSetCount: { amount: number }
  asyncMulti: number
  asyncIncrement: void
  asyncDecrement: void
}
