export type Literal = number

export type Reference = string

export type ArgsInstruction = [Reference, 'args', Literal]
export type BitwiseAndInstruction = [Reference, '&', Reference, Reference]
export type BitwiseNotInstruction = [Reference, '~', Reference]
export type BitwiseShiftLeftInstruction = [Reference, '<<', Reference, Literal]
export type BitwiseXorInstruction = [Reference, '^', Reference, Reference]
export type ReturnInstruction = [Reference, 'return']
export type WhileInstruction = [Reference, 'while', Instruction[]]

export type Instruction =
  | ArgsInstruction
  | BitwiseAndInstruction
  | BitwiseNotInstruction
  | BitwiseShiftLeftInstruction
  | BitwiseXorInstruction
  | ReturnInstruction
  | WhileInstruction

export type Program = Instruction[]

const test: Program = [
  ['x', 'args', 0],
  ['y', 'args', 1],
  [
    'x',
    'while',
    [
      ['t', '~', 'x'],
      ['t', '&', 't', 'y'],
      ['x', '^', 'x', 'y'],
      ['y', '<<', 't', 1],
    ],
  ],
  ['y', 'return'],
]
