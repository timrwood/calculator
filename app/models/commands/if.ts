import type { CommandDef } from '../types'
import { createCommandAndErrorsParser, createConditionalEvaluator } from '../commands/helper'

export const ifDef: CommandDef = {
  parse: createCommandAndErrorsParser(1),
  evaluate: createConditionalEvaluator(a => a === 0),
}
