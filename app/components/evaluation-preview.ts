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
  get isClassName() {
    switch (typeof this.args.evaluation.is) {
      case 'boolean':
        return 'text-green-600'
      case 'number':
        return 'text-blue-600'
      default:
        return 'text-slate-600'
    }
  }
}
