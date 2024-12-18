import type { CommandDef } from '../types'
import { createCommandAndErrorsParser } from '../commands/helper'

export const setDef: CommandDef = {
  parse: createCommandAndErrorsParser(1),
}
