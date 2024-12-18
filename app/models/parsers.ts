import type { Src, Cmd } from './commands'

import { getCommand } from './commands'

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
    return getCommand(tokens[0]).parse(tokens, refs)
  })
}

export function convertRef(ref: string, refs: RefMap): number {
  if (typeof refs[ref] !== 'number') {
    refs[ref] = Object.keys(refs).length
  }
  return refs[ref]
}
