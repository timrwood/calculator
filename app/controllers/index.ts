import Controller from '@ember/controller'
import { action } from '@ember/object'
import { tracked } from '@glimmer/tracking'
import { parse } from '../models/parser'
import { interpret } from '../models/interpreter'
import type { Interpreter } from '../models/interpreter'
import operations from '../models/programs/index'

export default class IndexController extends Controller {
  queryParams = ['x', 'y', 'showInterpreter', 'showSource', 'operation']

  @tracked x: number = 0
  @tracked y: number = 0
  @tracked operation: string = 'add'
  @tracked showInterpreter: boolean = false
  @tracked showSource: boolean = false

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

  @action toggleInterpreter() {
    this.showInterpreter = !this.showInterpreter
  }

  @action toggleSource() {
    this.showSource = !this.showSource
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
