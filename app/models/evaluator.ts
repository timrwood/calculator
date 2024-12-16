import type {
  Program,
  BitwiseAndInstruction,
  BitwiseNotInstruction,
  BitwiseShiftLeftInstruction,
  BitwiseXorInstruction,
  ArgsInstruction,
  ReturnInstruction,
  LoopInstruction,
  Instruction,
  Reference,
} from './program'

export type Value = number

export type EvaluationCallback = (instruction: Instruction, evaluator: Evaluator) => void

export type Evaluation = {
  op: Instruction
  as: Reference
  is: Value
  re: ReferenceRegistry
}

type ReferenceRegistry = {
  [key: Reference]: Value
}

type EvaluationCallbackRegistry = {
  [key: string]: EvaluationCallback
}

const evaluationCallbacks: EvaluationCallbackRegistry = {}

const registerCallback = (op: string, callback: EvaluationCallback) => (evaluationCallbacks[op] = callback)

registerCallback('args', (instruction: Instruction, evaluator: Evaluator) => {
  const [as, _op, index] = instruction as ArgsInstruction

  evaluator.push(instruction, as, evaluator.getArg(index))
})

registerCallback('loop', (instruction: Instruction, evaluator: Evaluator) => {
  const [as, op, body] = instruction as LoopInstruction

  for (let i = 0; i < 16; i++) {
    evaluator.push([as, op, []], as, i)
    evaluator.evaluateInstructions(body)
  }
})

registerCallback('and', (instruction: Instruction, evaluator: Evaluator) => {
  const [as, _op, left, right] = instruction as BitwiseAndInstruction

  evaluator.push(instruction, as, evaluator.get(left) & evaluator.get(right))
})

registerCallback('xor', (instruction: Instruction, evaluator: Evaluator) => {
  const [as, _op, left, right] = instruction as BitwiseXorInstruction

  evaluator.push(instruction, as, evaluator.get(left) ^ evaluator.get(right))
})

registerCallback('lshift', (instruction: Instruction, evaluator: Evaluator) => {
  const [as, _op, left, right] = instruction as BitwiseShiftLeftInstruction

  evaluator.push(instruction, as, evaluator.get(left) << right)
})

registerCallback('not', (instruction: Instruction, evaluator: Evaluator) => {
  const [as, _op, left] = instruction as BitwiseNotInstruction

  evaluator.push(instruction, as, ~evaluator.get(left))
})

registerCallback('return', (instruction: Instruction, evaluator: Evaluator) => {
  const [as, _op] = instruction as ReturnInstruction

  evaluator.returnValue = evaluator.get(as)
  console.log(evaluator.returnValue)

  evaluator.push(instruction, as, evaluator.get(as))
})

export default class Evaluator {
  program: Program
  registry: ReferenceRegistry = {}
  evaluations: Evaluation[] = []
  args: number[] = []
  returnValue: number | undefined

  constructor(program: Program, args: number[]) {
    this.program = program
    this.args = args
  }

  reset() {
    this.registry = {}
    this.evaluations = []
  }

  getArg(index: number): number {
    return this.args[index] || 0
  }

  get(args: Reference): number {
    return this.registry[args] || 0
  }

  setReturn(value: number) {
    this.returnValue = value
  }

  set(args: Reference, value: number) {
    this.registry[args] = value
  }

  push(op: Instruction, as: Reference, is: Value) {
    const re = { ...this.registry }
    this.set(as, is)
    this.evaluations.push({ op, as, is, re })
  }

  evaluate() {
    this.reset()

    this.evaluateInstructions(this.program)
  }

  evaluateInstructions(instructions: Instruction[]) {
    instructions.forEach(instruction => evaluationCallbacks[instruction[1]]?.(instruction, this))
  }
}
