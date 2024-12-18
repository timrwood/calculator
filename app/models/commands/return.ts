import type { CommandDef } from '../types'
import { createCommandAndErrorsParser } from '../commands/helper'

export const returnDef: CommandDef = {
  parse: createCommandAndErrorsParser(0),
}
