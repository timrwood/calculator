import type {
  Operation,
  Values,
  Step,
  Program,
  Evaluation,
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
    const err: string[] = []

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

export function createTwoArgEvaluator(op: (valA: number, valB: number) => number) {
  return function (vals: Values, _args: Values, step: Step): Evaluation {
    const refA = step.arg[0] as number
    const refB = step.arg[1] as number
    const valA = vals[refA] as number
    const valB = vals[refB] as number
    const retn = op(valA, valB)

    const vsls = [
      { cmd: '', ref: refA, val: valA },
      { cmd: step.opr, ref: refB, val: valB },
      { cmd: '=', ref: step.out, val: retn },
    ]

    return { step, vals, vsls, next: step.num + 1, retn }
  }
}

export function createOneArgEvaluator(op: (val: number) => number) {
  return function (vals: Values, _args: Values, step: Step): Evaluation {
    const ref = step.arg[0] as number
    const val = vals[ref] as number
    const retn = op(val)

    const vsls = [
      { cmd: step.opr, ref: ref, val: val },
      { cmd: '=', ref: step.out, val: retn },
    ]

    return { step, vals, vsls, next: step.num + 1, retn }
  }
}

export function createConditionalEvaluator(op: (val: number) => boolean) {
  return function (vals: Values, _args: Values, step: Step): Evaluation {
    const ref = step.arg[0] as number
    const val = vals[ref] as number
    const retn = vals[step.out] as number
    const next = op(retn) ? step.num + val + 1 : step.num + 1

    const vsls = [
      { cmd: step.opr, ref: step.out, val: retn },
      { cmd: 'jump', ref: ref, val: next },
    ]

    return { step, vals, vsls, next, retn }
  }
}
