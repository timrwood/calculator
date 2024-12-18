import type { CommandDef } from '../types'
import { createCommandAndErrorsParser } from '../commands/helper'

export const ifDef: CommandDef = {
  parse: createCommandAndErrorsParser(1),
}
