export type Literal = number

export type Reference = string

export type ArgsInstruction = [Reference, 'args', Literal]
export type BitwiseAndInstruction = [Reference, 'and', Reference, Reference]
export type BitwiseNotInstruction = [Reference, 'not', Reference]
export type BitwiseShiftLeftInstruction = [Reference, 'lshift', Reference, Literal]
export type BitwiseXorInstruction = [Reference, 'xor', Reference, Reference]
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
