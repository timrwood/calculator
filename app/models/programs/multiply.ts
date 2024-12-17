export default `
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

  set h 1
  and h h y

  unless h 5
  copy a x

  and c a r
  xor r a r
  shiftl a c 1
  if a -4

  shiftl x x 1
  shiftr y y 1
  if y -11

  unless s 6
  not r r
  set a 1
  and c a r
  xor r a r
  shiftl a c 1
  if a -4

  return r
`
