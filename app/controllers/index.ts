import Controller from '@ember/controller'
import { action } from '@ember/object'
import { tracked } from '@glimmer/tracking'
import { parse } from '../models/parser'
import { interpret } from '../models/interpreter'
import type { Interpreter } from '../models/interpreter'

const SUBTRACT = `
  args x 0
  args y 1

  start y
    not c x
    and c c y
    xor x x y
    shiftl y c 1
  restart y

  return x
`

const ADD = `
  args x 0
  args y 1

  start y
    and c y x
    xor x y x
    shiftl y c 1
  restart y

  return x
`

const MULTIPLY = `
  args y 1
  args x 0
  set r 0

  start y
    set h 1
    and h h y
    if h 6
      copy a x
      start a
        and c a r
        xor r a r
        shiftl a c 1
      restart a
    shiftl x x 1
    shiftr y y 1
  restart y

  return r
`

// set h 1
//   start r
//     and c r x
//     xor x r x
//     shiftl r c 1
//   restart r
// restart y

const operations: { [key: string]: string } = {
  subtract: SUBTRACT,
  add: ADD,
  multiply: MULTIPLY,
}

export default class IndexController extends Controller {
  queryParams = ['x', 'y', 'showInterpreter', 'showSource', 'operation']

  @tracked x: number = 0
  @tracked y: number = 0
  @tracked operation: string = 'subtract'
  @tracked showInterpreter: boolean = false
  @tracked showSource: boolean = false

  get source(): string {
    return operations[this.operation] ?? ADD
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
    console.log(prog)
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
