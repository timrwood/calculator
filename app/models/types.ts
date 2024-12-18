export type Operation =
  | 'and'
  | 'args'
  | 'if'
  | 'not'
  | 'return'
  | 'set'
  | 'shiftl'
  | 'shiftr'
  | 'unless'
  | 'xor'
  | 'unknown'

export type Reference = number

export type Arguments = [Reference?, Reference?]

export type Tokens = string[]

export type Values = number[]

export type CommandAndErrors = {
  opr: Operation
  out: Reference
  arg: Arguments
  err: string[]
}

export type RefMap = {
  set(tokens: Tokens): void
  get(ref: string): Reference
  refs(): string[]
  vals(): Values
}

export type Step = {
  src: string
  tok: Tokens
  opr: Operation
  out: Reference
  arg: [Reference?, Reference?]
  num: number
  err: string[]
}

export type Program = {
  stps: Step[]
  refs: string[]
  vals: Values
}

export type CommandAndErrorsParser = (tokens: Tokens, refMap: RefMap) => CommandAndErrors
export type StepEvaluator = (vals: Values, args: Values, step: Step) => Evaluation

export type CommandDef = {
  parse: CommandAndErrorsParser
  evaluate: StepEvaluator
}

export type CommandMap = { [key: string]: CommandDef }

export type Visualization = {
  cmd: string
  ref: number
  val: number
}

export type Evaluation = {
  step: Step
  vals: Values
  vsls: Visualization[]
  next: number
  retn: number
}

export type Execution = {
  prog: Program
  args: Values
  evls: Evaluation[]
  retn: number
  time: number
}
