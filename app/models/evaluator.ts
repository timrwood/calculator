import Program from './program'
import type {
  Instruction,
  SetInstruction,
  WhileInstruction,
  XorInstruction,
  AndInstruction,
  ShiftLeftInstruction,
  Expression,
} from './program'

type Op =
  | ['set', string, number]
  | ['!=', string, number]
  | ['while']
  | ['&', string, string]
  | ['^', string, string]
  | ['<<', string, number]
  | ['return', string]

type As = string
type Is = number | boolean

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

  evaluate() {
    this.reset()

    this.program.instructions.forEach((instruction) => this.evaluateInstruction(instruction))
  }

  evaluateInstruction(instruction: Instruction) {
    switch (instruction[0]) {
      case 'set':
        return this.evaluateSetInstruction(instruction as SetInstruction)
      default:
    }
  }

  evaluateSetInstruction(instruction: SetInstruction) {
    const as = `n:${instruction[1]}`
    const is = this.evaluateExpression(instruction[2])
    const op: Op = ['set', as, is]

    this.registry[as] = is
    const re = { ...this.registry }

    this.evaluations.push({ op, as, is, re })
  }

  evaluateExpression(expression: Expression): number {
    if (typeof expression === 'number') {
      return expression
    }
    switch (expression[0]) {
      // case '!=':
      //   return this.evaluateNotEqualInstruction(expression as XorInstruction)
      // case '&':
      //   return this.evaluateAndInstruction(expression as AndInstruction)
      // case '^':
      //   return this.evaluateXorInstruction(expression as XorInstruction)
      // case '<<':
      //   return this.evaluateShiftLeftInstruction(expression as ShiftLeftInstruction)
      default:
        return 0
    }
  }
}
