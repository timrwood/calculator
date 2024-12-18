import { helper } from '@ember/component/helper'

export default helper(function toFixed([number, places]: [number, number] /*, named*/) {
  return number.toFixed(places)
})
