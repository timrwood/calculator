import type {
  Src,
  Cmd,
  ArgsCmd,
  AndCmd,
  IfCmd,
  NotCmd,
  ReturnCmd,
  SetCmd,
  ShiftLeftCmd,
  ShiftRightCmd,
  UnlessCmd,
  XorCmd,
} from './commands'

export type RefMap = { [key: string]: number }

export type ParserError = {
  message: string
}

export type CmdOrError = Cmd | ParserError
export type SrcParser = (tokens: Tokens, vars: RefMap) => Cmd | ParserError
export type Tokens = string[]

export function parseCmds(srcs: Src[], refs: RefMap): CmdOrError[] {
  return srcs.map(src => {
    const tokens = src.split(/\s+/)
    const parser = parsers[tokens[0] as string]
    return parser ? parser(tokens, refs) : { message: `Unknown command: ${tokens[0]}` }
  })
}

const parsers: { [key: string]: SrcParser } = {
  and: parseAndCmd,
  args: parseArgsCmd,
  if: parseIfCmd,
  not: parseNotCmd,
  return: parseReturnCmd,
  set: parseSetCmd,
  shiftl: parseShiftLeftCmd,
  shiftr: parseShiftRightCmd,
  unless: parseUnlessCmd,
  xor: parseXorCmd,
}

function convertRef(ref: string, refs: RefMap): number {
  if (typeof refs[ref] !== 'number') {
    refs[ref] = Object.keys(refs).length
  }
  return refs[ref]
}

function parseArgsCmd(tokens: Tokens, refs: RefMap): ArgsCmd | ParserError {
  if (tokens[1] === undefined) return { message: `Invalid argument 1 for ${tokens[0]}` }
  if (tokens[2] === undefined) return { message: `Invalid argument 2 for ${tokens[0]}` }

  return ['args', convertRef(tokens[1], refs), convertRef(tokens[2], refs)] as ArgsCmd
}

function parseAndCmd(tokens: Tokens, refs: RefMap): AndCmd | ParserError {
  if (tokens[1] === undefined) return { message: `Invalid argument 1 for ${tokens[0]}` }
  if (tokens[2] === undefined) return { message: `Invalid argument 2 for ${tokens[0]}` }
  if (tokens[3] === undefined) return { message: `Invalid argument 3 for ${tokens[0]}` }

  return ['and', convertRef(tokens[1], refs), convertRef(tokens[2], refs), convertRef(tokens[3], refs)]
}

function parseSetCmd(tokens: Tokens, refs: RefMap): SetCmd | ParserError {
  if (tokens[1] === undefined) return { message: `Invalid argument 1 for ${tokens[0]}` }
  if (tokens[2] === undefined) return { message: `Invalid argument 2 for ${tokens[0]}` }

  return ['set', convertRef(tokens[1], refs), convertRef(tokens[2], refs)]
}

function parseNotCmd(tokens: Tokens, refs: RefMap): NotCmd | ParserError {
  if (tokens[1] === undefined) return { message: `Invalid argument 1 for ${tokens[0]}` }
  if (tokens[2] === undefined) return { message: `Invalid argument 2 for ${tokens[0]}` }

  return ['not', convertRef(tokens[1], refs), convertRef(tokens[2], refs)]
}

function parseIfCmd(tokens: Tokens, refs: RefMap): IfCmd | ParserError {
  if (tokens[1] === undefined) return { message: `Invalid argument 1 for ${tokens[0]}` }
  if (tokens[2] === undefined) return { message: `Invalid argument 2 for ${tokens[0]}` }

  return ['if', convertRef(tokens[1], refs), convertRef(tokens[2], refs)]
}

function parseUnlessCmd(tokens: Tokens, refs: RefMap): UnlessCmd | ParserError {
  if (tokens[1] === undefined) return { message: `Invalid argument 1 for ${tokens[0]}` }
  if (tokens[2] === undefined) return { message: `Invalid argument 2 for ${tokens[0]}` }

  return ['unless', convertRef(tokens[1], refs), convertRef(tokens[2], refs)]
}

function parseReturnCmd(tokens: Tokens, refs: RefMap): ReturnCmd | ParserError {
  if (tokens[1] === undefined) return { message: `Invalid argument 1 for ${tokens[0]}` }

  return ['return', convertRef(tokens[1], refs)]
}

function parseShiftLeftCmd(tokens: Tokens, refs: RefMap): ShiftLeftCmd | ParserError {
  if (tokens[1] === undefined) return { message: `Invalid argument 1 for ${tokens[0]}` }
  if (tokens[2] === undefined) return { message: `Invalid argument 2 for ${tokens[0]}` }
  if (tokens[3] === undefined) return { message: `Invalid argument 3 for ${tokens[0]}` }

  return ['shiftl', convertRef(tokens[1], refs), convertRef(tokens[2], refs), convertRef(tokens[3], refs)]
}

function parseShiftRightCmd(tokens: Tokens, refs: RefMap): ShiftRightCmd | ParserError {
  if (tokens[1] === undefined) return { message: `Invalid argument 1 for ${tokens[0]}` }
  if (tokens[2] === undefined) return { message: `Invalid argument 2 for ${tokens[0]}` }
  if (tokens[3] === undefined) return { message: `Invalid argument 3 for ${tokens[0]}` }

  return ['shiftr', convertRef(tokens[1], refs), convertRef(tokens[2], refs), convertRef(tokens[3], refs)]
}

function parseXorCmd(tokens: Tokens, refs: RefMap): XorCmd | ParserError {
  if (tokens[1] === undefined) return { message: `Invalid argument 1 for ${tokens[0]}` }
  if (tokens[2] === undefined) return { message: `Invalid argument 2 for ${tokens[0]}` }
  if (tokens[3] === undefined) return { message: `Invalid argument 3 for ${tokens[0]}` }

  return ['xor', convertRef(tokens[1], refs), convertRef(tokens[2], refs), convertRef(tokens[3], refs)]
}
