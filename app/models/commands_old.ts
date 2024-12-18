export type Val = number
export type Ref = number
export type Src = string

export type AndCmd = ['and', Ref, Ref, Ref]
export type ArgsCmd = ['args', Ref, Val]
export type IfCmd = ['if', Ref, Val]
export type UnlessCmd = ['unless', Ref, Val]
export type NotCmd = ['not', Ref, Ref]
export type ReturnCmd = ['return', Ref]
export type SetCmd = ['set', Ref, Val]
export type ShiftLeftCmd = ['shiftl', Ref, Ref, Val]
export type ShiftRightCmd = ['shiftr', Ref, Ref, Val]
export type XorCmd = ['xor', Ref, Ref, Ref]

export type Cmd =
  | AndCmd
  | ArgsCmd
  | IfCmd
  | NotCmd
  | ReturnCmd
  | SetCmd
  | ShiftLeftCmd
  | ShiftRightCmd
  | UnlessCmd
  | XorCmd

import type { Tokens, RefMap, ParserError } from './parsers'

import type { SrcParser } from './parsers'

export type CmdDef = {
  parse: SrcParser
}

import { andDef } from './commands/and'
import { argsDef } from './commands/args'
import { ifDef } from './commands/if'
import { notDef } from './commands/not'
import { returnDef } from './commands/return'
import { setDef } from './commands/set'
import { shiftlDef } from './commands/shiftl'
import { shiftrDef } from './commands/shiftr'
import { unlessDef } from './commands/unless'
import { xorDef } from './commands/xor'

const unknownCommand: CmdDef = {
  parse: function (tokens: Tokens, refs: RefMap): Cmd | ParserError {
    return { message: `Unknown command: ${tokens[0]}` }
  },
}

const commands: { [key: string]: CmdDef } = {
  and: andDef,
  args: argsDef,
  if: ifDef,
  not: notDef,
  return: returnDef,
  set: setDef,
  shiftl: shiftlDef,
  shiftr: shiftrDef,
  unless: unlessDef,
  xor: xorDef,
}

export function getCommand(name: string | undefined): CmdDef {
  return commands[name ?? 'unknown'] || unknownCommand
}
