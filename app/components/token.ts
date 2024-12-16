import Component from '@glimmer/component'

export interface TokenSignature {
  Args: {
    value: string
    type: string
  }
  Blocks: {
    default: []
  }
  Element: null
}

const TYPES: { [key: string]: string } = {
  literal: 'text-red-500',
  operation: 'text-blue-500',
  variable: 'text-green-500',
  keyword: 'text-yellow-500',
}

export default class Token extends Component<TokenSignature> {
  get typeClass() {
    return TYPES[this.args.type] || 'text-gray-500'
  }
}
