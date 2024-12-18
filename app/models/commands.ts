import type { CommandMap, CommandDef } from './types'

import { unknownDef } from './commands/unknown'
import { andDef } from './commands/and'
import { argsDef } from './commands/args'
import { ifDef } from './commands/if'
import { orDef } from './commands/or'
import { notDef } from './commands/not'
import { returnDef } from './commands/return'
import { setDef } from './commands/set'
import { shiftlDef } from './commands/shiftl'
import { shiftrDef } from './commands/shiftr'
import { unlessDef } from './commands/unless'
import { xorDef } from './commands/xor'

const commands: CommandMap = {
  and: andDef,
  args: argsDef,
  if: ifDef,
  not: notDef,
  or: orDef,
  return: returnDef,
  set: setDef,
  shiftl: shiftlDef,
  shiftr: shiftrDef,
  unless: unlessDef,
  xor: xorDef,
}

export function getCommand(name: string | undefined): CommandDef {
  return commands[name || 'unknown'] || unknownDef
}
