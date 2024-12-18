import { parse } from '../parser'

export const lessThan = parse(`
  args x 0
  args y 1

  xor a x y

  shiftr b a 1
  or a a b
  shiftr b a 2
  or a a b
  shiftr b a 4
  or a a b
  shiftr b a 8
  or a a b
  shiftr b a 16
  or a a b
  shiftr b a 1
  xor a a b
  and a a x

  if a 1
  return x
  return y


`)
