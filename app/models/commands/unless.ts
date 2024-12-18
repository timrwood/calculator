import type { CommandDef } from '../types'
import { createCommandAndErrorsParser } from '../commands/helper'

export const unlessDef: CommandDef = {
  parse: createCommandAndErrorsParser(1),
}
