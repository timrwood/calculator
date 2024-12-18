import type { Program, Tokens } from './types'

import { buildRefMap } from './ref_map'
import { getCommand } from './commands'

function tokenize(src: string): Tokens {
  return src.trim().split(/\s+/)
}

export function parse(src: string): Program {
  const srcLines = src.split('\n').filter(line => line.trim())
  const refMap = buildRefMap()

  srcLines.forEach(srcLine => refMap.set(tokenize(srcLine)))

  const stps = srcLines.map((src, num) => {
    const tok = tokenize(src)
    const { opr, out, arg, err } = getCommand(tok[0]).parse(tok, refMap)
    return { src, tok, num, opr, out, arg, err }
  })

  const refs = refMap.refs()
  const vals = refMap.vals()

  return { stps, refs, vals }
}
