import Component from '@glimmer/component'
import Evaluator from '../models/evaluator'

export interface EvaluatorPreviewSignature {
  Args: {
    evaluator: Evaluator
  }
  Blocks: {
    default: []
  }
  Element: null
}

export default class EvaluatorPreview extends Component<EvaluatorPreviewSignature> {
  get evaluations() {
    const evaluator = this.args.evaluator
    evaluator.evaluate()
    return evaluator.evaluations
  }
}
