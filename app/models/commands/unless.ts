import type { CmdDef, Cmd } from '../commands'
import type { Tokens, RefMap, ParserError } from '../parsers'
import { convertRef } from '../parsers'

export const unlessDef: CmdDef = {
  parse: function (tokens: Tokens, refs: RefMap): Cmd | ParserError {
    if (tokens[1] === undefined) return { message: `Invalid argument 1 for ${tokens[0]}` }
    if (tokens[2] === undefined) return { message: `Invalid argument 2 for ${tokens[0]}` }

    return ['unless', convertRef(tokens[1], refs), convertRef(tokens[2], refs)]
  },
}
