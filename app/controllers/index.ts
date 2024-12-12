import Controller from '@ember/controller'
import { action } from '@ember/object'
import Program from '../models/program'
import Evaluator from '../models/evaluator'
import { tracked } from '@glimmer/tracking'

export default class IndexController extends Controller {
  queryParams = ['x', 'y']

  @tracked x = undefined
  @tracked y = undefined

  get program(): Program {
    const x = ~~(this.x ?? 0)
    const y = ~~(this.y ?? 0)
    return this.subtractProgram(x, y)
  }

  addProgram(x: number, y: number): Program {
    return new Program([
      ['set', 'x', x],
      ['set', 'y', y],
      [
        'while',
        ['!=', 'x', 0],
        [
          ['set', 't', ['&', 'x', 'y']],
          ['set', 'y', ['^', 'x', 'y']],
          ['set', 'x', ['<<', 't', 1]],
        ],
      ],
      ['return', 'y'],
    ])
  }

  subtractProgram(x: number, y: number): Program {
    return new Program([
      ['set', 'x', x],
      ['set', 'y', y],
      [
        'while',
        ['!=', 'y', 0],
        [
          ['set', 't', ['~', 'x']],
          ['set', 't', ['&', 't', 'y']],
          ['set', 'x', ['^', 'x', 'y']],
          ['set', 'y', ['<<', 't', 1]],
        ],
      ],
      ['return', 'x'],
    ])
  }

  get evaluator(): Evaluator {
    return new Evaluator(this.program)
  }

  @action setX(event: InputEvent) {
    this.x = ~~event.target.value
  }

  @action setY(event: InputEvent) {
    this.y = ~~event.target.value
  }
}
