import type {
  Src,
  Cmd,
  ArgsCmd,
  AndCmd,
  NotCmd,
  RestartCmd,
  ReturnCmd,
  ShiftLeftCmd,
  StartCmd,
  XorCmd,
} from './commands'
import type { Program } from './parser'

export type Visual = {
  op: string
  val: number
}

export type Evaluation = {
  program: Program
  visuals: Visual[]
  vals: Int32Array
  cmd: Cmd
  src: Src
}

export type Interpreter = {
  program: Program
  evaluations: Evaluation[]
}

type Interpretation = (program: Program) => Evaluation

export function interpret(program: Program): Interpreter {
  const evaluations: Evaluation[] = []

  while (program.step < program.cmds.length) {
    const cmd = program.cmds[program.step] as Cmd
    const interpreter = interpreters[cmd[0]]
    if (interpreter) evaluations.push(interpreter(program))
    program.step++
  }

  return { program, evaluations }
}

const interpreters: { [key: string]: Interpretation } = {
  args: interpretArgs,
  and: interpretAdd,
  not: interpretNot,
  restart: interpretRestart,
  start: interpretStart,
  return: interpretReturn,
  shiftl: interpretShiftLeft,
  xor: interpretXor,
}

function recordEvaluation(program: Program, visuals: Visual[]): Evaluation {
  return {
    program,
    visuals,
    vals: program.vals.slice(),
    cmd: program.cmds[program.step] as Cmd,
    src: program.srcs[program.step] as Src,
  }
}

function interpretArgs(program: Program): Evaluation {
  const cmd = program.cmds[program.step] as ArgsCmd
  const val = program.args[cmd[2]] as number
  program.vals[cmd[1]] = val

  return recordEvaluation(program, [{ op: '=', val }])
}

function interpretAdd(program: Program): Evaluation {
  const cmd = program.cmds[program.step] as AndCmd
  const l = program.args[cmd[2]] as number
  const r = program.args[cmd[3]] as number
  const val = l & r
  program.vals[cmd[1]] = val

  return recordEvaluation(program, [
    { op: '', val: l },
    { op: 'and', val: r },
    { op: '=', val },
  ])
}

function interpretNot(program: Program): Evaluation {
  const cmd = program.cmds[program.step] as NotCmd
  const before = program.args[cmd[2]] as number
  const val = ~before
  program.vals[cmd[1]] = val

  return recordEvaluation(program, [
    { op: 'not', val: before },
    { op: '=', val },
  ])
}

function interpretRestart(program: Program): Evaluation {
  const cmd = program.cmds[program.step] as RestartCmd
  if (program.vals[cmd[1]]) {
    program.step = program.jmps[cmd[1]] as number
  }

  return recordEvaluation(program, [{ op: 'restart', val: cmd[1] }])
}

function interpretStart(program: Program): Evaluation {
  const cmd = program.cmds[program.step] as StartCmd
  program.jmps[cmd[1]] = program.step

  return recordEvaluation(program, [{ op: 'start', val: cmd[1] }])
}

function interpretReturn(program: Program): Evaluation {
  const cmd = program.cmds[program.step] as ReturnCmd
  program.retn = program.vals[cmd[1]] as number

  return recordEvaluation(program, [{ op: 'return', val: program.retn }])
}

function interpretShiftLeft(program: Program): Evaluation {
  const cmd = program.cmds[program.step] as ShiftLeftCmd
  const l = program.args[cmd[2]] as number
  const r = program.args[cmd[3]] as number
  const val = l << r
  program.vals[cmd[1]] = val

  return recordEvaluation(program, [
    { op: '', val: l },
    { op: '<<', val: r },
    { op: '=', val },
  ])
}

function interpretXor(program: Program): Evaluation {
  const cmd = program.cmds[program.step] as XorCmd
  const l = program.args[cmd[2]] as number
  const r = program.args[cmd[3]] as number
  const val = l ^ r
  program.vals[cmd[1]] = val

  return recordEvaluation(program, [
    { op: '', val: l },
    { op: 'xor', val: r },
    { op: '=', val },
  ])
}
