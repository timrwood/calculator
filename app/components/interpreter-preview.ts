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

export default class InterpreterPreview extends Component<InterpreterPreviewSignature> {}
