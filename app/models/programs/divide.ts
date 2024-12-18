import { parse } from '../parser'

export const divide = parse(`
  args x 0
  args y 1

  set q 0

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

  set m 1
  shiftl m m 31

  set i m
  set b x
  shiftr i i 1
  shiftr b b 1
  if i -3

  if m -7

  and q q m

  return q
`)

// x / y

// // Initialize the quotient
// long long quotient = 0;

//

// // Iterate from most significant bit to
// // least significant bit
// for (int i = 31; i >= 0; --i) {

//   // Check if (divisor << i) <= dividend
//   if ((b << i) <= a) {
//     a -= (b << i);
//     quotient |= (1LL << i);
//   }
// }

// return sign * quotient
