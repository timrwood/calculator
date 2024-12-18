import type {
  Operation,
  Reference,
  Arguments,
  CommandAndErrorsParser,
  CommandAndErrors,
  RefMap,
  Tokens,
} from '../types'

export function tokenize(src: string): Tokens {
  return src.split(/\s+/)
}

export function createCommandAndErrorsParser(count: number): CommandAndErrorsParser {
  return function (tok: Tokens, refMap: RefMap): CommandAndErrors {
    let err: string[] = []

    const opr = tok[0] as Operation
    const tok1 = tok[1]
    const tok2 = tok[2]
    const tok3 = tok[3]

    const out = refMap.get(tok1 ?? '')
    const arg0 = refMap.get(tok2 ?? '')
    const arg1 = refMap.get(tok3 ?? '')

    if (out === undefined) err.push(`Missing output for ${opr}`)
    if (tok2 === undefined && count >= 1) err.push(`Missing argument 0 for ${opr}`)
    if (tok3 === undefined && count >= 2) err.push(`Missing argument 1 for ${opr}`)

    if (tok.length - count > 2) err.push(`Too many arguments for ${opr}`)

    let arg: Arguments = []
    if (count === 1) arg = [arg0]
    if (count === 2) arg = [arg0, arg1]

    return { opr, out, arg, err }
  }
}
