import Route from '@ember/routing/route'
import Program from '../models/program'

export default class IndexRoute extends Route {
  model() {
    return new Program([
      ['set', 'x', 12],
      ['set', 'y', 34],
      [
        'while',
        ['!=', 'carry', 0],
        [
          ['set', 'carry', ['&', 'x', 'y']],
          ['set', 'y', ['^', 'y', 'x']],
          ['set', 'x', ['<<', 'carry', 1]],
        ],
      ],
      ['return', 'y'],
    ])
  }
}
