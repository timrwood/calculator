import type { Cmd, Src } from './commands'
import type { RefMap, ParserError } from './parsers'

import { parseCmds } from './parsers'

export type Program = {
  args: Int32Array
  refs: string[]
  vals: Int32Array
  jmps: Int32Array
  cmds: Cmd[]
  srcs: Src[]
  step: number
  retn: number
}

export function parse(data: string): Program | ParserError {
  const refMap: RefMap = {}
  const srcs = parseSrcs(data)
  const cmds = parseCmds(srcs, refMap)
  const refs = parseRefs(refMap)

  const invalidCmds = cmds.filter(cmd => 'message' in cmd)
  if (invalidCmds.length) {
    return invalidCmds[0] as ParserError
  }

  return {
    args: new Int32Array([1, 2]),
    refs,
    srcs,
    cmds: cmds as Cmd[],
    jmps: new Int32Array(refs.length),
    vals: new Int32Array(refs.length),
    step: 0,
    retn: 0,
  }
}

function parseSrcs(data: string): Src[] {
  return data
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
}

function parseRefs(refMap: RefMap): string[] {
  const refs: string[] = []
  Object.entries(refMap).forEach(([ref, index]) => {
    refs[index] = ref
  })
  return refs
}
