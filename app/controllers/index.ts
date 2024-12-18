import Controller from '@ember/controller'
import { action } from '@ember/object'
import { tracked } from '@glimmer/tracking'
import type { Execution, Program } from '../models/types'
import { execute } from '../models/executor'
import { getProgram } from '../models/programs'

export default class IndexController extends Controller {
  queryParams = ['x', 'y', 'reveal', 'operation']

  @tracked x: string = '0'
  @tracked y: string = '0'
  @tracked operation: string = 'add'
  @tracked reveal: number = 0

  get xNumber(): number {
    return parseInt(this.x, 10) || 0
  }

  get yNumber(): number {
    return parseInt(this.y, 10) || 0
  }

  get operations() {
    return [
      { label: '+', value: 'add' },
      { label: '-', value: 'subtract' },
      { label: '×', value: 'multiply' },
      { label: '÷', value: 'divide' },
    ]
  }

  get program(): Program {
    return getProgram(this.operation)
  }

  get execution(): Execution {
    const args = [this.xNumber, this.yNumber]
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

  sanitizeInput(input: string): string {
    const isNegative = input.startsWith('-')
    const sanitized = input.replace(/[^0-9]/g, '')
    return isNegative ? `-${sanitized}` : sanitized
  }

  @action setX(event: Event) {
    const target = event.target as HTMLInputElement
    const value = this.sanitizeInput(target.value)
    this.x = target.value = value
  }

  @action resetX() {
    this.x = this.xNumber.toString()
  }

  @action setY(event: Event) {
    const target = event.target as HTMLInputElement
    const value = this.sanitizeInput(target.value)
    this.y = target.value = value
  }

  @action resetY() {
    this.y = this.yNumber.toString()
  }
}
