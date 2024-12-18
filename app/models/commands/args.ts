import type { CommandDef, Values, Step, Evaluation } from '../types'
import { createCommandAndErrorsParser } from '../commands/helper'

export const argsDef: CommandDef = {
  parse: createCommandAndErrorsParser(1),
  evaluate(vals: Values, args: Values, step: Step): Evaluation {
    const ref = step.arg[0] as number
    const val = vals[ref] as number
    const retn = args[val] as number

    const vsls = [
      { cmd: step.opr, ref: ref, val: val },
      { cmd: '=', ref: step.out, val: retn },
    ]

    return { step, vals, vsls, next: step.num + 1, retn }
  },
}
