import type { RefMap, Tokens, Reference } from './types'

function compare(a: string, b: string) {
  return a > b ? 1 : a < b ? -1 : 0
}

function val(string: string) {
  return string.match(/-?\d+/) ? parseInt(string, 10) : 0
}

export function buildRefMap(): RefMap {
  const refList: string[] = []

  function get(ref: string): Reference {
    return refList.indexOf(ref)
  }

  function set(tokens: Tokens) {
    for (let i = 1; i < tokens.length; i++) {
      const token = tokens[i]

      if (token && get(token) < 0) {
        refList.push(token)
        refList.sort(compare)
      }
    }
  }

  function refs() {
    return refList.slice()
  }

  function vals() {
    return refList.map(val)
  }

  return { set: set, get: get, refs, vals }
}
