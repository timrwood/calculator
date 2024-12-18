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
  vals(): number[]
}

export type CommandAndErrorsParser = (tokens: Tokens, refMap: RefMap) => CommandAndErrors

export type CommandDef = {
  parse: CommandAndErrorsParser
}

export type CommandMap = { [key: string]: CommandDef }

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
  vals: number[]
}
