import type { Program, Values, Evaluation, Execution } from './types'

import { getCommand } from './commands'

export function execute(prog: Program, args: Values): Execution {
  let step = prog.stps[0]
  let retn = 0
  let time = performance.now()
  let vals = prog.vals.slice()

  const evls: Evaluation[] = []

  while (step) {
    const evl = getCommand(step.opr).evaluate(vals, args, step)
    evls.push(evl)
    vals = evl.vals.slice()
    retn = vals[step.out] = evl.retn
    step = prog.stps[evl.next]

    if (evls.length >= 1000) {
      console.error('Interpreter exceeded 1000 evaluations')
      step = undefined
    }
  }

  time = performance.now() - time

  return { prog, args, evls, retn, time }
}
