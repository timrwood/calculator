import Component from '@glimmer/component'
import { action } from '@ember/object'
import { tracked } from '@glimmer/tracking'
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
  @tracked isIntersecting = false

  get height() {
    const padding = 3.25
    const lineHeight = 1
    const lines = Math.max(this.args.evaluation.vals.length, this.args.evaluation.visuals.length)
    const height = padding + lines * lineHeight
    console.log('lines', lines)

    return `${height}rem`
  }

  @action onIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    this.isIntersecting = entries.some(entry => entry.isIntersecting)
  }
}
