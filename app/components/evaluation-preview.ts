import Component from '@glimmer/component'
import type { Evaluation } from '../models/interpreter'

export interface EvaluationPreviewSignature {
  Args: {
    evaluation: Evaluation
  }
  Blocks: {
    default: []
  }
  Element: null
}

export default class EvaluationPreview extends Component<EvaluationPreviewSignature> {
  get srcTokens() {
    return this.args.evaluation.src.split(/\s+/).map((value, index) => {
      let type = index ? 'variable' : 'operation'
      if (value.match(/^[0-9]+$/)) type = 'literal'

      return { value, type }
    })
  }
}
