// ______________________________________________________
//
export type S = {
  count: number
  flag: boolean
}
// ______________________________________________________
//
export type G = {
  hogehoge: number
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
