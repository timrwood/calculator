import Controller from '@ember/controller'
import { action } from '@ember/object'
import type { Program } from '../models/program'
import Evaluator from '../models/evaluator'
import { tracked } from '@glimmer/tracking'

export default class IndexController extends Controller {
  queryParams = ['x', 'y']

  @tracked x = undefined
  @tracked y = undefined

  get program(): Program {
    return this.subtractProgram
  }

  get args(): number[] {
    const x = ~~(this.x ?? 0)
    const y = ~~(this.y ?? 0)
    return [x, y]
  }

  get addProgram(): Program {
    return [
      ['x', 'args', 0],
      ['y', 'args', 1],
      [
        'x',
        'while',
        [
          ['t', '&', 'x', 'y'],
          ['y', '^', 'x', 'y'],
          ['x', '<<', 't', 1],
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
        'y',
        'while',
        [
          ['t', '~', 'x'],
          ['t', '&', 't', 'y'],
          ['x', '^', 'x', 'y'],
          ['y', '<<', 't', 1],
        ],
      ],
      ['x', 'return'],
    ]
  }

  get evaluator(): Evaluator {
    return new Evaluator(this.program, this.args)
  }

  @action setX(event: Event) {
    this.x = ~~event.target.value
  }

  @action setY(event: InputEvent) {
    this.y = ~~event.target.value
  }
}
