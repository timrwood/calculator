import Component from '@glimmer/component'
import type { Evaluation } from '../models/evaluator'

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
  get evaluationJson() {
    return JSON.stringify(this.args.evaluation, null, 2)
  }
}
