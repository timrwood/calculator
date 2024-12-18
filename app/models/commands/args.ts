import type { CommandDef } from '../types'
import { createCommandAndErrorsParser } from '../commands/helper'

export const argsDef: CommandDef = {
  parse: createCommandAndErrorsParser(1),
}
