import Component from '@glimmer/component'
import type { Execution, Step } from '../models/types'

export interface ProgramPreviewSignature {
  Args: {
    execution: Execution
  }
  Blocks: {
    default: []
  }
  Element: null
}

export default class ProgramPreview extends Component<ProgramPreviewSignature> {
  get cmds() {
    return this.args.execution.prog.stps.map((step: Step) => {
      return [step.opr, step.out, ...step.arg].join(' ')
    })
  }

  get refs() {
    return this.args.execution.prog.refs.map((ref, i) => `${i} = ${ref}`)
  }
}
