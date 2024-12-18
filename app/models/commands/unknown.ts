import type { CommandAndErrors, CommandDef, RefMap, Tokens } from '../types'

export const unknownDef: CommandDef = {
  parse: function (_tokens: Tokens, _refMap: RefMap): CommandAndErrors {
    return { opr: 'unknown', out: -1, arg: [], err: ['Unknown command'] }
  },
}
