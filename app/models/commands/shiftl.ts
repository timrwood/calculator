import type { CommandDef } from '../types'
import { createCommandAndErrorsParser } from '../commands/helper'

export const shiftlDef: CommandDef = {
  parse: createCommandAndErrorsParser(2),
}
