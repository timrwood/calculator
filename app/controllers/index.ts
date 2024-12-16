import Controller from '@ember/controller'
import { action } from '@ember/object'
import type { Program } from '../models/program'
import Evaluator from '../models/evaluator'
import { tracked } from '@glimmer/tracking'
import { parse } from '../models/parser'
import { interpret } from '../models/interpreter'
import type { Interpreter } from '../models/interpreter'

export default class IndexController extends Controller {
  queryParams = ['x', 'y']

  @tracked x: number = 0
  @tracked y: number = 0

  get interpreter(): Interpreter {
    const prog = parse(this.addSource)
    prog.args[0] = ~~(this.x ?? 0)
    prog.args[1] = ~~(this.y ?? 0)
    return interpret(prog)
  }

  get args(): number[] {
    const x = ~~(this.x ?? 0)
    const y = ~~(this.y ?? 0)
    return [x, y]
  }

  get addSource(): string {
    return `
      args x 0
      args y 1

      start x
        and c x y
        xor y x y
        shiftl x c 1
      restart x

      return y
    `
  }

  get addProgram(): Program {
    return [
      ['x', 'args', 0],
      ['y', 'args', 1],
      [
        'i',
        'loop',
        [
          ['c', 'and', 'x', 'y'],
          ['y', 'xor', 'x', 'y'],
          ['x', 'lshift', 'c', 1],
        ],
      ],
      ['y', 'return'],
    ]
  }

  get subtractProgram(): Program {
    return [
      ['x', 'args', 0],
      ['y', 'args', 1],
      [
        'i',
        'loop',
        [
          ['carry', 'not', 'x'],
          ['carry', 'and', 'carry', 'y'],
          ['x', 'xor', 'x', 'y'],
          ['y', 'lshift', 'carry', 1],
        ],
      ],
      ['x', 'return'],
    ]
  }

  get evaluator(): Evaluator {
    const evaluator = new Evaluator(this.program, this.args)
    evaluator.evaluate()
    return evaluator
  }

  @action setX(event: Event) {
    this.x = event.target?.value
  }

  @action setY(event: InputEvent) {
    this.y = event.target?.value
  }
}
