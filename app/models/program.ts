export type LiteralExpression = number
export type SetInstruction = ['set', string, Expression]
export type WhileInstruction = ['while', Instruction, Instruction[]]
export type ReturnInstruction = ['return', string]
export type NotEqualInstruction = ['!=', string, Expression]
export type AndInstruction = ['&', string, string]
export type XorInstruction = ['^', string, string]
export type ShiftLeftInstruction = ['<<', string, Expression]

export type Instruction =
  | SetInstruction
  | WhileInstruction
  | ReturnInstruction
  | NotEqualInstruction
  | AndInstruction
  | XorInstruction
  | ShiftLeftInstruction

export type Expression = LiteralExpression | Instruction

export default class Program {
  instructions: Instruction[]

  constructor(instructions: Instruction[]) {
    this.instructions = instructions
  }
}
