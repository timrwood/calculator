import Component from '@glimmer/component'
import type { Src } from '../models/commands_old'

export interface SrcPreviewSignature {
  Args: {
    src: Src
  }
  Blocks: {
    default: []
  }
  Element: null
}

export default class SrcPreview extends Component<SrcPreviewSignature> {
  get srcTokens() {
    return this.args.src.split(/\s+/).map((value, index) => {
      let type = index ? 'variable' : 'operation'
      if (value.match(/^-?[0-9]+$/)) type = 'literal'
      if (value === '=') type = 'assignment'

      return { value, type }
    })
  }
}
