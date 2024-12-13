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

const COLOR_TOKEN = 'text-slate-400'
const COLOR_TRANSFORM = 'text-slate-300'
const COLOR_OPERATOR = 'text-blue-600'
const COLOR_REFERENCE = 'text-green-600'
const COLOR_VALUE = 'text-red-600'

export default class EvaluationPreview extends Component<EvaluationPreviewSignature> {
  get initialSyntax() {
    const op = this.args.evaluation.op
    return [
      { color: COLOR_TOKEN, text: '(' },
      { color: COLOR_REFERENCE, text: op[0] },
      { color: COLOR_OPERATOR, text: ' ' + op[1] },
      { color: COLOR_REFERENCE, text: ' ' + op.slice(2).join(' ') },
      { color: COLOR_TOKEN, text: ')' },
    ].filter(({ text }) => text.trim())
  }

  get readableSyntax() {
    const op = this.args.evaluation.op
    switch (op[1]) {
      case 'while':
      case 'return':
        return this.readableWhile
      case 'not':
      case 'args':
        return this.readableUnary
      case 'and':
      case 'xor':
      case 'lshift':
        return this.readableTwoReferences
      default:
        return this.readableAny
    }
  }

  get finalSyntax() {
    const { is } = this.args.evaluation
    return [this.reference(), this.equals(), { color: COLOR_VALUE, text: is }]
  }

  get readableArgs() {
    const { is, op } = this.args.evaluation
    return [
      this.reference(),
      this.equals(),
      this.operator(),

      { color: COLOR_OPERATOR, text: op[1], eColor: COLOR_OPERATOR, eText: '' },
      { color: COLOR_TOKEN, text: '(', eColor: COLOR_TOKEN, eText: '' },
      { color: COLOR_REFERENCE, text: op[2], eColor: COLOR_VALUE, eText: is },
      { color: COLOR_TOKEN, text: ')', eColor: COLOR_TOKEN, eText: '' },
    ]
  }

  get readableWhile() {
    return [this.operator(), this.token('('), this.referenceOrValue(), this.token(')')]
  }

  get readableUnary() {
    return [this.reference(), this.equals(), this.operator(), this.token('('), this.valueAt(2), this.token(')')]
  }

  get readableTwoReferences() {
    return [
      this.reference(),
      this.equals(),
      this.operator(),
      this.token('('),
      this.valueAt(2),
      this.token(', '),
      this.valueAt(3),
      this.token(')'),
    ]
  }

  get readableOneReference() {
    return [
      this.reference(),
      this.equals(),
      this.valueAt(2),
      this.token(' '),
      this.operator(),
      this.token(' '),
      this.valueAt(3),
    ]
  }

  get readableAny() {
    const op = this.args.evaluation.op
    return [
      this.reference(),
      { color: COLOR_TOKEN, text: ' = ', eColor: COLOR_TOKEN, eText: ' = ' },
      this.operator(),
      { color: COLOR_TOKEN, text: '(' },
      { color: COLOR_REFERENCE, text: op.slice(2).join(' ') },
      { color: COLOR_TOKEN, text: ')' },
    ].filter(({ text }) => text.trim())
  }

  valueAt(index: number) {
    const { is, op, re } = this.args.evaluation
    const ref = op[index]
    const isRef = typeof ref === 'string' ? re[ref] : ref

    return {
      color: typeof ref === 'string' ? COLOR_REFERENCE : COLOR_VALUE,
      text: ref,
      eColor: COLOR_VALUE,
      eText: isRef,
    }
  }

  equals() {
    return { color: COLOR_TOKEN, text: ' = ', eColor: COLOR_TOKEN, eText: ' = ' }
  }

  operator() {
    const op = this.args.evaluation.op
    return { color: COLOR_OPERATOR, text: op[1], eColor: COLOR_OPERATOR, eText: op[1] }
  }

  reference() {
    const op = this.args.evaluation.op
    return { color: COLOR_REFERENCE, text: op[0], eColor: COLOR_REFERENCE, eText: op[0] }
  }

  referenceOrValue() {
    const { is, op } = this.args.evaluation
    return { color: COLOR_REFERENCE, text: op[0], eColor: COLOR_VALUE, eText: is }
  }

  token(text: string, eText: string | null = null) {
    return { color: COLOR_TOKEN, text, eColor: COLOR_TOKEN, eText: eText ?? text }
  }

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

  get hasFirstArg() {
    return this.firstArg !== undefined
  }

  get firstArg() {
    const evaluation = this.args.evaluation
    switch (evaluation.op[1]) {
      case 'not':
      case 'and':
      case 'xor':
      case 'lshift':
        return evaluation.re[evaluation.op[2]]
    }
  }

  get firstArgPrefix() {
    const op = this.args.evaluation.op[1]
    switch (op) {
      case 'lshift':
        return op
    }
  }

  get secondArg() {
    const evaluation = this.args.evaluation
    switch (evaluation.op[1]) {
      case 'and':
      case 'xor':
        return evaluation.re[evaluation.op[3]]
    }
  }

  get secondArgPrefix() {
    const op = this.args.evaluation.op[1]
    switch (op) {
      case 'and':
      case 'xor':
        return op
    }
  }
}
