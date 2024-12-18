import { parse } from '../parser'

export const divide = parse(`
  args x 0
  args y 1

  set q 0

  if y 1
  return 0

  shiftr sx x 31
  shiftr sy y 31

  unless sy 6
  not y y
  set a 1
  and c a y
  xor y a y
  shiftl a c 1
  if a -4

  unless sx 6
  not x x
  set a 1
  and c a x
  xor x a x
  shiftl a c 1
  if a -4

  set i 15

    set c y
    shiftl c c i

    xor a c x

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
    and a a c

  if a 8
      shiftl a y i
      not c x
      and c c a
      xor x x a
      shiftl a c 1
    if a -5
    shiftl c 1 i
    or q q c

  unless i 7

  set a 1
  not c i
  and c c a
  xor i i a
  shiftl a c 1
  if a -5
  if 1 -33

  xor sx sx sy

  unless sx 6
  not q q
  set a 1
  and c a q
  xor q a q
  shiftl a c 1
  if a -4

  return q
`)
