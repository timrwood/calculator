import type { CommandDef } from '../types'
import { createCommandAndErrorsParser } from '../commands/helper'

export const notDef: CommandDef = {
  parse: createCommandAndErrorsParser(1),
}
