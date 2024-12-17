export default `
  args x 0
  args y 1

  not c x
  and c c y
  xor x x y
  shiftl y c 1
  if y -5

  return x
`
