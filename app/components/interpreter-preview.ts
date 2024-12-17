import Component from '@glimmer/component'
import type { Interpreter } from '../models/interpreter'

export interface InterpreterPreviewSignature {
  Args: {
    interpreter: Interpreter
  }
  Blocks: {
    default: []
  }
  Element: null
}

function longestString(strings: string[]) {
  let max = ''
  for (let i = 0; i < strings.length; i++) {
    const string = strings[i]
    if (string && string.length > max.length) {
      max = strings[i] as string
    }
  }
  return max
}

export default class InterpreterPreview extends Component<InterpreterPreviewSignature> {
  get maxLine() {
    return longestString(this.args.interpreter.evaluations.map(evaluation => `L${evaluation.step}`))
  }

  get maxVisualsCommand() {
    const strings = this.args.interpreter.evaluations
      .flatMap(evaluation => evaluation.visuals)
      .map(visual => `${visual.op} ${visual.ref}`)
    return longestString(strings)
  }

  get maxVisualsValue() {
    const strings = this.args.interpreter.evaluations
      .flatMap(evaluation => evaluation.visuals)
      .map(visual => `= ${visual.val}`)
    return longestString(strings)
  }

  get maxCommandValue() {
    const strings = this.args.interpreter.evaluations.map(evaluation => evaluation.src)
    return longestString(strings)
  }

  get maxRefValue() {
    const strings = this.args.interpreter.program.refs.map(ref => `${ref} = `)
    return longestString(strings)
  }
}
