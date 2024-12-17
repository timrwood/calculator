const multiply = `
  args x 0
  args y 1

  shiftr s y 31

  unless s 6
  not y y
  set a 1
  and c a y
  xor y a y
  shiftl a c 1
  if a -4

  set r 0

  and h 1 y

  unless h 5
  set a x

  and c a r
  xor r a r
  shiftl a c 1
  if a -4

  shiftl x x 1
  shiftr y y 1
  if y -10

  unless s 6
  not r r
  set a 1
  and c a r
  xor r a r
  shiftl a c 1
  if a -4

  return r
`

export default multiply

import { parse } from '../parser'
import type { Program } from '../parser'
import { interpret } from '../interpreter'

function test(x: number, y: number, e: number) {
  const prog = parse(multiply) as Program
  prog.args[0] = x
  prog.args[1] = y
  interpret(prog)
  if (prog.retn !== e) {
    console.error(`expected ${x} * ${y} = ${e}, got ${prog.retn}`)
  } else {
    // console.log(`${x} * ${y} = ${prog.retn}`)
  }
}

test(0, 0, 0)
test(0, 1, 0)
test(1, 0, 0)
test(1, 1, 1)
test(2, 1, 2)
test(2, 5, 10)
test(-2, 5, -10)
test(3, -4, -12)
test(-22, -5, 110)
