import type { CommandDef } from '../types'
import { createCommandAndErrorsParser } from '../commands/helper'

export const andDef: CommandDef = {
  parse: createCommandAndErrorsParser(2),
}
