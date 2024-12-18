import type { RefMap, Tokens, Reference } from './types'

const isNumberRegex = /^-?\d+$/

function compare(a: string, b: string) {
  const intA = parseInt(a, 10)
  const intB = parseInt(b, 10)
  const compareIsNumber = ~~isNumberRegex.test(a) - ~~isNumberRegex.test(b)
  const compareSign = Math.sign(intB + 1) - Math.sign(intA + 1)
  const compareNumber = Math.abs(intA) - Math.abs(intB)
  const compareStrings = a.localeCompare(b)

  return compareIsNumber || compareSign || compareNumber || compareStrings
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
