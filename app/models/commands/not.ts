import type { CommandDef } from '../types'
import { createCommandAndErrorsParser, createOneArgEvaluator } from '../commands/helper'

export const notDef: CommandDef = {
  parse: createCommandAndErrorsParser(1),
  evaluate: createOneArgEvaluator(a => ~a),
}
