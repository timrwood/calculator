import Component from '@glimmer/component'
import type { Program } from '../models/parser'

export interface ProgramSrcsPreviewSignature {
  Args: {
    program: Program
  }
  Blocks: {
    default: []
  }
  Element: null
}

export default class ProgramSrcsPreview extends Component<ProgramSrcsPreviewSignature> {
  get cmds() {
    return this.args.program.cmds.map(cmd => cmd.join(' '))
  }

  get refs() {
    return this.args.program.refs.map((ref, i) => `${i} = ${ref}`)
  }
}
