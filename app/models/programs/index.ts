import type { Program } from '../types'

import { add } from './add'
import { subtract } from './subtract'
import { multiply } from './multiply'
import { lessThan } from './less-than'
import { divide } from './divide'

const programs: { [key: string]: Program } = {
  add,
  subtract,
  multiply,
  divide,
  lessThan,
}

export function getProgram(name: string | undefined): Program {
  return programs[name || 'add'] || add
}
