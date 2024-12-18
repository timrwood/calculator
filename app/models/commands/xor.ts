import type { CommandDef } from '../types'
import { createCommandAndErrorsParser } from '../commands/helper'

export const xorDef: CommandDef = {
  parse: createCommandAndErrorsParser(2),
}
