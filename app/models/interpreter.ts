import type {
  AndCmd,
  ArgsCmd,
  Cmd,
  NotCmd,
  RestartCmd,
  ReturnCmd,
  ShiftLeftCmd,
  Src,
  StartCmd,
  XorCmd,
} from './commands'
import type { Program } from './parser'

type VisualSource = {
  op: string
  ref: number
}

export type Visual = {
  op: string
  val: number
  ref: string
}

export type Evaluation = {
  program: Program
  visuals: Visual[]
  vals: Int32Array
  cmd: Cmd
  src: Src
}

export type EvaluationSrc = {
  program: Program
  cmd: Cmd
  src: Src
  vals: Int32Array
  step: number
}

export type Interpreter = {
  program: Program
  evaluations: Evaluation[]
}

type Interpretation = (evaluationSrc: EvaluationSrc) => Evaluation

export function interpret(program: Program): Interpreter {
  const evaluations: Evaluation[] = []

  while (program.step < program.cmds.length) {
    const step = program.step
    const cmd = program.cmds[step] as Cmd
    const evaluationSrc: EvaluationSrc = {
      program,
      cmd,
      src: program.srcs[step] as Src,
      vals: program.vals,
      step,
    }

    const interpreter = interpreters[cmd[0]]
    if (interpreter) evaluations.push(interpreter(evaluationSrc))
    program.step++
  }

  return { program, evaluations }
}

const interpreters: { [key: string]: Interpretation } = {
  args: interpretArgs,
  and: interpretAnd,
  not: interpretNot,
  restart: interpretRestart,
  start: interpretStart,
  return: interpretReturn,
  shiftl: interpretShiftLeft,
  xor: interpretXor,
}

function recordEvaluation(evaluationSrc: EvaluationSrc, visualSources: VisualSource[]): Evaluation {
  const program = evaluationSrc.program
  const step = evaluationSrc.step
  const visuals: Visual[] = visualSources.map(source => {
    return {
      op: source.op,
      val: program.vals[source.ref] as number,
      ref: program.refs[source.ref] as string,
    }
  })
  return {
    program,
    visuals,
    vals: program.vals.slice(),
    cmd: program.cmds[step] as Cmd,
    src: program.srcs[step] as Src,
  }
}

function interpretArgs(evaluationSrc: EvaluationSrc): Evaluation {
  const cmd = evaluationSrc.cmd as ArgsCmd
  const program = evaluationSrc.program
  const val = program.args[cmd[2]] as number
  program.vals[cmd[1]] = val

  return recordEvaluation(evaluationSrc, [{ op: '=', ref: cmd[1] }])
}

function interpretAnd(evaluationSrc: EvaluationSrc): Evaluation {
  const cmd = evaluationSrc.cmd as AndCmd
  const left = evaluationSrc.vals[cmd[2]] as number
  const right = evaluationSrc.vals[cmd[3]] as number
  evaluationSrc.vals[cmd[1]] = left & right

  return recordEvaluation(evaluationSrc, [
    { op: '', ref: cmd[2] },
    { op: 'and', ref: cmd[3] },
    { op: '=', ref: cmd[1] },
  ])
}

function interpretNot(evaluationSrc: EvaluationSrc): Evaluation {
  const cmd = evaluationSrc.cmd as NotCmd
  const before = evaluationSrc.vals[cmd[2]] as number
  evaluationSrc.vals[cmd[1]] = ~before

  return recordEvaluation(evaluationSrc, [
    { op: 'not', ref: cmd[2] },
    { op: '=', ref: cmd[1] },
  ])
}

function interpretRestart(evaluationSrc: EvaluationSrc): Evaluation {
  const program = evaluationSrc.program
  const cmd = evaluationSrc.cmd as RestartCmd
  const val = evaluationSrc.vals[cmd[1]] as number

  if (val) program.step = program.jmps[cmd[1]] as number

  return recordEvaluation(evaluationSrc, [{ op: 'restart', ref: cmd[1] }])
}

function interpretStart(evaluationSrc: EvaluationSrc): Evaluation {
  const program = evaluationSrc.program
  const cmd = evaluationSrc.cmd as StartCmd

  program.jmps[cmd[1]] = evaluationSrc.step

  return recordEvaluation(evaluationSrc, [{ op: 'start', ref: cmd[1] }])
}

function interpretReturn(evaluationSrc: EvaluationSrc): Evaluation {
  const program = evaluationSrc.program
  const cmd = evaluationSrc.cmd as ReturnCmd
  program.retn = evaluationSrc.vals[cmd[1]] as number

  return recordEvaluation(evaluationSrc, [{ op: 'return', ref: cmd[1] }])
}

function interpretShiftLeft(evaluationSrc: EvaluationSrc): Evaluation {
  const cmd = evaluationSrc.cmd as ShiftLeftCmd
  const l = evaluationSrc.vals[cmd[2]] as number
  const r = cmd[3]
  const val = l << r
  evaluationSrc.vals[cmd[1]] = val

  return recordEvaluation(evaluationSrc, [
    { op: '<<', ref: cmd[2] },
    { op: '=', ref: cmd[1] },
  ])
}

function interpretXor(evaluationSrc: EvaluationSrc): Evaluation {
  const cmd = evaluationSrc.cmd as XorCmd
  const l = evaluationSrc.vals[cmd[2]] as number
  const r = evaluationSrc.vals[cmd[3]] as number
  evaluationSrc.vals[cmd[1]] = l ^ r

  return recordEvaluation(evaluationSrc, [
    { op: '', ref: cmd[2] },
    { op: 'xor', ref: cmd[3] },
    { op: '=', ref: cmd[1] },
  ])
}
