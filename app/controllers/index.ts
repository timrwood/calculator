import Controller from '@ember/controller'
import { action } from '@ember/object'
import { tracked } from '@glimmer/tracking'
import type { Execution, Program } from '../models/types'
import { execute } from '../models/executor'
import { getProgram } from '../models/programs'

export default class IndexController extends Controller {
  queryParams = ['x', 'y', 'reveal', 'operation']

  @tracked x: number = 0
  @tracked y: number = 0
  @tracked operation: string = 'add'
  @tracked reveal: number = 0

  get operations() {
    return [
      { label: '+', value: 'add' },
      { label: '-', value: 'subtract' },
      { label: '×', value: 'multiply' },
      { label: '÷', value: 'divide' },
      { label: '<', value: 'lessThan' },
    ]
  }

  get program(): Program {
    return getProgram(this.operation)
  }

  get execution(): Execution {
    const args = [~~(this.x ?? 0), ~~(this.y ?? 0)]
    return execute(this.program, args)
  }

  get showingSrcs() {
    return this.reveal >= 1
  }

  get showingCmds() {
    return this.reveal >= 2
  }

  get showingArgs() {
    return this.reveal >= 3
  }

  get showingSteps() {
    return this.reveal >= 4
  }

  @action setReveal(reveal: number) {
    if (this.reveal >= reveal) {
      this.reveal = reveal - 1
    } else {
      this.reveal = reveal
    }
  }

  @action setOperation(operation: string) {
    this.operation = operation
  }

  @action setX(event: Event) {
    const target = event.target as HTMLInputElement
    this.x = ~~target.value
  }

  @action setY(event: Event) {
    const target = event.target as HTMLInputElement
    this.y = ~~target.value
  }
}
