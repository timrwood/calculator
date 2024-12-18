import type { CmdDef, Cmd } from '../commands'
import type { Tokens, RefMap, ParserError } from '../parsers'
import { convertRef } from '../parsers'

export const returnDef: CmdDef = {
  parse: function (tokens: Tokens, refs: RefMap): Cmd | ParserError {
    if (tokens[1] === undefined) return { message: `Invalid argument 1 for ${tokens[0]}` }

    return ['return', convertRef(tokens[1], refs)]
  },
}
