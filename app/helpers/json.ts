import { helper } from '@ember/component/helper'

export default helper(function json(positional /*, named*/) {
  return JSON.stringify(positional[0], null, 2)
})
