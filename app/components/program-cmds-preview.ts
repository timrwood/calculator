import Component from '@glimmer/component'
import type { Program } from '../models/parser_old'

export interface ProgramPreviewSignature {
  Args: {
    program: Program
  }
  Blocks: {
    default: []
  }
  Element: null
}

export default class ProgramPreview extends Component<ProgramPreviewSignature> {
  get cmds() {
    return this.args.program.cmds.map(cmd => cmd.join(' '))
  }

  get refs() {
    return this.args.program.refs.map((ref, i) => `${i} = ${ref}`)
  }
}
