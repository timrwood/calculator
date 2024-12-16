import Controller from '@ember/controller'
import { action } from '@ember/object'
import { tracked } from '@glimmer/tracking'
import { parse } from '../models/parser'
import { interpret } from '../models/interpreter'
import type { Interpreter } from '../models/interpreter'

const SUBTRACT = `
  args x 0
  args y 1

  start x
    not c y
    and c c x
    xor y y x
    shiftl x c 1
  restart x

  return y
`

const ADD = `
  args x 0
  args y 1

  start x
    and c x y
    xor y x y
    shiftl x c 1
  restart x

  return y
`

export default class IndexController extends Controller {
  queryParams = ['x', 'y', 'showInterpreter']

  @tracked x: number = 0
  @tracked y: number = 0
  @tracked showInterpreter: boolean = false

  get interpreter(): Interpreter {
    const prog = parse(SUBTRACT)
    console.log(prog)
    prog.args[0] = ~~(this.x ?? 0)
    prog.args[1] = ~~(this.y ?? 0)
    return interpret(prog)
  }

  get args(): number[] {
    const x = ~~(this.x ?? 0)
    const y = ~~(this.y ?? 0)
    return [x, y]
  }

  @action toggleInterpreter() {
    this.showInterpreter = !this.showInterpreter
  }

  @action setX(event: Event) {
    this.x = ~~event.target?.value
  }

  @action setY(event: InputEvent) {
    this.y = ~~event.target?.value
  }
}
