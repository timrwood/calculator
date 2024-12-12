import Component from '@glimmer/component'
import type { Is } from '../models/evaluator'

export interface IntegerBitsSignature {
  Args: {
    number: Is
  }
  Blocks: {
    default: []
  }
  Element: null
}

export default class IntegerBits extends Component<IntegerBitsSignature> {
  get bits(): boolean[] {
    const number = this.args.number
    if (typeof number !== 'number') {
      return []
    }

    const bits = []

    for (let i = 31; i >= 0; i--) {
      bits.push((number & (1 << i)) !== 0)
    }

    return bits
  }
}
