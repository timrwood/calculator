import Component from '@glimmer/component'
import type { Program } from '../models/parser'

export interface ProgramArgsPreviewSignature {
  Args: {
    program: Program
  }
  Blocks: {
    default: []
  }
  Element: null
}

export default class ProgramArgsPreview extends Component<ProgramArgsPreviewSignature> {}
