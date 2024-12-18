import type { CommandDef } from '../types'
import { createCommandAndErrorsParser, createTwoArgEvaluator } from '../commands/helper'

export const andDef: CommandDef = {
  parse: createCommandAndErrorsParser(2),
  evaluate: createTwoArgEvaluator((a, b) => a & b),
}
