import Component from '@glimmer/component'
import type { Program } from '../models/parser_old'

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
