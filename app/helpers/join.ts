import { helper } from '@ember/component/helper'

export default helper(function join([joiner, array]: [string, any[]] /*, named*/) {
  return array.join(joiner)
})
