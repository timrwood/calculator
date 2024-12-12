import Program from './program'
import type {
  Instruction,
  SetInstruction,
  WhileInstruction,
  NotEqualInstruction,
  XorInstruction,
  AndInstruction,
  ReturnInstruction,
  ShiftLeftInstruction,
  NotInstruction,
  Expression,
} from './program'

export type As = string
export type Is = number | boolean | undefined

export type Op =
  | ['set', string, any]
  | ['!=', string, Is]
  | ['while', string]
  | ['~', string]
  | ['&', string, string]
  | ['^', string, string]
  | ['<<', string, number]
  | ['return', string]

export type Evaluation = {
  op: Op
  as: As
  is: Is
  re: Registry
}

type Registry = {
  [key: string]: Is
}

const evaluations = [
  { op: ['set', 'n:x', 12], as: 'n:x', is: 12 },
  { op: ['set', 'n:y', 34], as: 'n:y', is: 34 },
  { op: ['!=', 'n:x', 0], as: 'a:0', is: true },
  { op: ['while'], as: 'a:0', is: true },
  { op: ['&', 'n:x', 'n:y'], as: 'a:1', is: 0 },
  { op: ['set', 'n:carry', 'a:1'], as: 'n:carry', is: 0 },
  { op: ['^', 'n:y', 'n:x'], as: 'a:2', is: 46 },
  { op: ['set', 'n:y', 'a:2'], as: 'n:y', is: 46 },
  { op: ['<<', 'n:carry', 1], as: 'a:3', is: 0 },
  { op: ['set', 'n:x', 'a:3'], as: 'n:x', is: 0 },
  { op: ['!=', 'n:x', 0], as: 'a:0', is: false },
  { op: ['while'], as: 'a:0', is: false },
  { op: ['return', 'n:y'], as: 'n:y', is: 46 },
]

const x = new Program([
  ['set', 'x', 12],
  ['set', 'y', 34],
  [
    'while',
    ['!=', 'x', 0],
    [
      ['set', 'carry', ['&', 'x', 'y']],
      ['set', 'y', ['^', 'y', 'x']],
      ['set', 'x', ['<<', 'carry', 1]],
    ],
  ],
  ['return', 'y'],
])

export default class Evaluator {
  program: Program
  registry: Registry = {}
  index: number = 0
  evaluations: Evaluation[] = []

  constructor(program: Program) {
    this.program = program
  }

  reset() {
    this.index = 0
    this.registry = {}
    this.evaluations = []
  }

  nextAutoRegister(): string {
    return `:${this.index++}`
  }

  pushEvaluation(op: Op, as: As, is: Is) {
    this.registry[as] = is
    const re = { ...this.registry }
    this.evaluations.push({ op, as, is, re })
  }

  evaluate() {
    this.reset()

    this.program.instructions.forEach((instruction) => this.evaluateInstruction(instruction))
  }

  evaluateInstruction(instruction: Instruction) {
    switch (instruction[0]) {
      case 'while':
        return this.evaluateWhileInstruction(instruction as WhileInstruction)
      default:
        return this.evaluateInstructionIntoRegister(instruction, null)
    }
  }

  evaluateInstructionIntoRegister(instruction: Instruction, intoRegister: string | null) {
    switch (instruction[0]) {
      case 'set':
        return this.evaluateSetInstruction(instruction as SetInstruction, intoRegister)
      case '!=':
        return this.evaluateNotEqualInstruction(instruction as NotEqualInstruction, intoRegister)
      case '&':
        return this.evaluateAndInstruction(instruction as AndInstruction, intoRegister)
      case '~':
        return this.evaluateNotInstruction(instruction as NotInstruction, intoRegister)
      case '^':
        return this.evaluateXorInstruction(instruction as XorInstruction, intoRegister)
      case '<<':
        return this.evaluateShiftLeftInstruction(instruction as ShiftLeftInstruction, intoRegister)
      case 'return':
        return this.evaluateReturnInstruction(instruction as ReturnInstruction, intoRegister)
      default:
        return
    }
  }

  evaluateReturnInstruction(instruction: ReturnInstruction, intoRegister: string | null) {
    const as = instruction[1]
    const is = this.registry[as]
    const op: Op = ['return', as]

    this.pushEvaluation(op, as, is)
  }

  evaluateSetInstruction(instruction: SetInstruction, intoRegister: string | null) {
    const as = instruction[1]
    const is = this.evaluateExpression(instruction[2], intoRegister)
    const op: Op = ['set', as, intoRegister || is]

    this.pushEvaluation(op, as, is)
  }

  evaluateWhileInstruction(instruction: WhileInstruction) {
    const [_command, condition, body] = instruction
    let maxIterations = 32
    const conditionRegister = this.nextAutoRegister()

    const bodyWithRegisters = body.map((instruction) => {
      const bodyRegister = this.nextAutoRegister()
      return { instruction, bodyRegister }
    })

    while (maxIterations--) {
      this.evaluateInstructionIntoRegister(condition, conditionRegister)
      this.pushEvaluation(['while', conditionRegister], conditionRegister, this.registry[conditionRegister])
      if (!this.registry[conditionRegister]) return

      bodyWithRegisters.forEach(({ instruction, bodyRegister }) => {
        this.evaluateInstructionIntoRegister(instruction, bodyRegister)
      })
    }
    return 'RIP'
  }

  evaluateNotEqualInstruction(instruction: NotEqualInstruction, intoRegister: string | null) {
    const [_command, variable, expression] = instruction
    const expected = this.evaluateExpression(expression, intoRegister)
    const actual = this.registry[variable]
    const op: Op = ['!=', variable, expected]
    const as = intoRegister
    const is = actual !== expected

    if (as === null) {
      console.error('register is null, skipping operation')
    } else {
      this.pushEvaluation(op, as, is)
    }
  }

  evaluateNotInstruction(instruction: NotInstruction, intoRegister: string | null) {
    const [_command, variable] = instruction
    const is = this.registry[variable]
    const op: Op = ['~', variable]

    if (typeof is !== 'number') {
      console.error('expected number, got:', is)
    } else if (intoRegister === null) {
      console.error('register is null, skipping operation')
    } else {
      this.pushEvaluation(op, intoRegister, ~is)
    }
  }

  evaluateAndInstruction(instruction: AndInstruction, intoRegister: string | null) {
    this.evaluateTwoNumberInstruction(
      ['&', instruction[1], instruction[2]],
      this.registry[instruction[1]],
      this.registry[instruction[2]],
      intoRegister,
      (l, r) => l & r,
    )
  }

  evaluateXorInstruction(instruction: XorInstruction, intoRegister: string | null) {
    this.evaluateTwoNumberInstruction(
      ['^', instruction[1], instruction[2]],
      this.registry[instruction[1]],
      this.registry[instruction[2]],
      intoRegister,
      (l, r) => l ^ r,
    )
  }

  evaluateShiftLeftInstruction(instruction: ShiftLeftInstruction, intoRegister: string | null) {
    this.evaluateTwoNumberInstruction(
      ['<<', instruction[1], instruction[2]],
      this.registry[instruction[1]],
      instruction[2],
      intoRegister,
      (l, r) => l << r,
    )
  }

  evaluateTwoNumberInstruction(
    op: Op,
    left: Is,
    right: Is,
    intoRegister: string | null,
    callback: (l: number, r: number) => number,
  ) {
    if (typeof left !== 'number') {
      console.error('expected number on left side, got:', left)
    } else if (typeof right !== 'number') {
      console.error('expected number on right side, got:', right)
    } else if (intoRegister === null) {
      console.error('register is null, skipping operation')
    } else {
      this.pushEvaluation(op, intoRegister, callback(left, right))
    }
  }

  evaluateExpression(expression: Expression, intoRegister: string | null): Is {
    if (typeof expression === 'number') {
      return expression
    }

    if (intoRegister) {
      this.evaluateInstructionIntoRegister(expression, intoRegister)
      return this.registry[intoRegister]
    } else {
      console.error('evaluating expression without a register to store it in')
    }
  }
}
