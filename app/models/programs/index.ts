import type { Program } from '../types'

import { add } from './add'
import { subtract } from './subtract'
import { multiply } from './multiply'
import { divide } from './divide'

const programs: { [key: string]: Program } = {
  add,
  subtract,
  multiply,
  divide,
}

export function getProgram(name: string | undefined): Program {
  return programs[name || 'add'] || add
}
