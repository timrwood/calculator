export type Literal = number

export type Reference = string

export type ArgsInstruction = [Reference, 'args', Literal]
export type BitwiseAndInstruction = [Reference, 'and', Reference, Reference]
export type BitwiseNotInstruction = [Reference, 'not', Reference]
export type BitwiseShiftLeftInstruction = [Reference, 'lshift', Reference, Literal]
export type BitwiseXorInstruction = [Reference, 'xor', Reference, Reference]
export type ReturnInstruction = [Reference, 'return']
export type LoopInstruction = [Reference, 'loop', Instruction[]]

export type Instruction =
  | ArgsInstruction
  | BitwiseAndInstruction
  | BitwiseNotInstruction
  | BitwiseShiftLeftInstruction
  | BitwiseXorInstruction
  | ReturnInstruction
  | LoopInstruction

export type Program = Instruction[]
