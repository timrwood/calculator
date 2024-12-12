import { helper } from '@ember/component/helper'

export default helper(function eq([a, b] /*, named*/) {
  return a === b
})
