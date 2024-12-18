import Component from '@glimmer/component'
import type { Execution } from '../models/types'

export interface ProgramSrcsPreviewSignature {
  Args: {
    execution: Execution
  }
  Blocks: {
    default: []
  }
  Element: null
}

export default class ProgramSrcsPreview extends Component<ProgramSrcsPreviewSignature> {}
