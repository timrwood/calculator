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

  get firstArg() {
    const evaluation = this.args.evaluation
    switch (evaluation.op[0]) {
      case '&':
      case '^':
      case '<<':
        return evaluation.re[evaluation.op[1]]
    }
  }

  get firstArgPrefix() {
    const op = this.args.evaluation.op[0]
    switch (op) {
      case '<<':
        return op
    }
  }

  get secondArg() {
    const evaluation = this.args.evaluation
    switch (evaluation.op[0]) {
      case '&':
      case '^':
        return evaluation.re[evaluation.op[2]]
    }
  }

  get secondArgPrefix() {
    const op = this.args.evaluation.op[0]
    switch (op) {
      case '&':
      case '^':
        return op
    }
  }
}
