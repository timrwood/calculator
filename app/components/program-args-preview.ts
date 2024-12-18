import Component from '@glimmer/component'
import type { Execution } from '../models/types'

export interface ProgramArgsPreviewSignature {
  Args: {
    execution: Execution
  }
  Blocks: {
    default: []
  }
  Element: null
}

export default class ProgramArgsPreview extends Component<ProgramArgsPreviewSignature> {}
