import Component from '@glimmer/component'
import type { Execution } from '../models/types'

export interface InterpreterPreviewSignature {
  Args: {
    execution: Execution
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
  get evls() {
    return this.args.execution.evls
  }

  get vsls() {
    return this.evls.flatMap(evl => evl.vsls)
  }

  get maxLine() {
    return longestString(this.evls.map(evl => `L${evl.step.num}`))
  }

  get maxVisualsCommand() {
    return longestString(this.vsls.map(vis => `${vis.cmd} ${vis.ref}`))
  }

  get maxVisualsValue() {
    return longestString(this.vsls.map(vis => `= ${vis.val}`))
  }

  get maxCommandValue() {
    return longestString(this.evls.map(evl => evl.step.src))
  }

  get maxRefValue() {
    return longestString(this.args.execution.prog.refs.map(ref => `${ref} = `))
  }
}
