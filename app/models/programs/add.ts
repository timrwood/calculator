import { parse } from '../parser'

export const add = parse(`
  args x 0 0
  args y 1

  and c y x
  xor x y x
  shiftl y c 1

  if y -4

  return x
`)

console.log(add)
