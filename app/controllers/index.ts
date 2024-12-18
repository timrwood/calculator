import Controller from '@ember/controller'
import { action } from '@ember/object'
import { tracked } from '@glimmer/tracking'
import { parse } from '../models/parser'
import { interpret } from '../models/interpreter'
import type { Interpreter } from '../models/interpreter'
import operations from '../models/programs/index'

export default class IndexController extends Controller {
  queryParams = ['x', 'y', 'reveal', 'operation']

  @tracked x: number = 0
  @tracked y: number = 0
  @tracked operation: string = 'add'
  @tracked reveal: number = 0

  get source(): string {
    return operations[this.operation] ?? (operations['add'] as string)
  }

  get operations() {
    return [
      { label: '+', value: 'add' },
      { label: '-', value: 'subtract' },
      { label: '×', value: 'multiply' },
      { label: '÷', value: 'divide' },
    ]
  }

  get interpreter(): Interpreter {
    const prog = parse(this.source)
    prog.args[0] = ~~(this.x ?? 0)
    prog.args[1] = ~~(this.y ?? 0)
    return interpret(prog)
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
    this.x = ~~event.target?.value
  }

  @action setY(event: InputEvent) {
    this.y = ~~event.target?.value
  }
}
