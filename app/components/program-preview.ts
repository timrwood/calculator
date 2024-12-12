import Component from '@glimmer/component'
import Program from '../models/program'

export interface ProgramPreviewSignature {
  Args: {
    program: Program
  }
  Blocks: {
    default: []
  }
  Element: null
}

export default class ProgramPreview extends Component<ProgramPreviewSignature> {}
