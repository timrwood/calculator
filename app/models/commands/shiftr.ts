import type { CommandDef } from '../types'
import { createCommandAndErrorsParser } from '../commands/helper'

export const shiftrDef: CommandDef = {
  parse: createCommandAndErrorsParser(2),
}
