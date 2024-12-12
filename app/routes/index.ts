import Route from '@ember/routing/route'
import Program from '../models/program'
import Evaluator from '../models/evaluator'

export default class IndexRoute extends Route {
  model() {
    const program = new Program([
      ['set', 'x', 123],
      ['set', 'y', 456],
      [
        'while',
        ['!=', 'x', 0],
        [
          ['set', 'carry', ['&', 'x', 'y']],
          ['set', 'y', ['^', 'y', 'x']],
          ['set', 'x', ['<<', 'carry', 1]],
        ],
      ],
      ['return', 'y'],
    ])
    const evaluator = new Evaluator(program)

    return { program, evaluator }
  }
}
