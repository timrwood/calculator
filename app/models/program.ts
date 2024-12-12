export type LiteralExpression = number

export type AndInstruction = ['&', string, string]
export type NotEqualInstruction = ['!=', string, Expression]
export type ReturnInstruction = ['return', string]
export type SetInstruction = ['set', string, Expression]
export type ShiftLeftInstruction = ['<<', string, number]
export type WhileInstruction = ['while', Instruction, Instruction[]]
export type XorInstruction = ['^', string, string]
export type NotInstruction = ['~', string]

export type Instruction =
  | SetInstruction
  | WhileInstruction
  | ReturnInstruction
  | NotEqualInstruction
  | AndInstruction
  | XorInstruction
  | ShiftLeftInstruction
  | NotInstruction

export type Expression = LiteralExpression | Instruction

export default class Program {
  instructions: Instruction[]

  constructor(instructions: Instruction[]) {
    this.instructions = instructions
  }
}
