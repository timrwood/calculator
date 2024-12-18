import type { CommandAndErrors, CommandDef, RefMap, Tokens, Values, Step, Evaluation } from '../types'

export const unknownDef: CommandDef = {
  parse: function (_tokens: Tokens, _refMap: RefMap): CommandAndErrors {
    return { opr: 'unknown', out: -1, arg: [], err: ['Unknown command'] }
  },
  evaluate(vals: Values, args: Values, step: Step): Evaluation {
    const retn = 0
    const vsls = [{ cmd: 'error', ref: step.out, val: retn }]
    return { step, vals, vsls, next: step.num + 1, retn }
  },
}
