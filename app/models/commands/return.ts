import type { CommandDef, Values, Step, Evaluation } from '../types'
import { createCommandAndErrorsParser } from '../commands/helper'

export const returnDef: CommandDef = {
  parse: createCommandAndErrorsParser(0),
  evaluate(vals: Values, args: Values, step: Step): Evaluation {
    const ref = step.out as number
    const retn = vals[ref] as number

    const vsls = [{ cmd: step.opr, ref: step.out, val: retn }]

    return { step, vals, vsls, next: -1, retn }
  },
}
