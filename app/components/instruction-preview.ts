import Component from '@glimmer/component'
import type { Instruction, WhileInstruction, SetInstruction, Expression } from '../models/program'

export interface InstructionPreviewSignature {
  Args: {
    instruction: Instruction
  }
  Blocks: {
    default: []
  }
  Element: null
}

export default class InstructionPreview extends Component<InstructionPreviewSignature> {
  get operation(): string {
    return this.args.instruction[0]
  }

  get commands(): string[] {
    return this.instructionCommands(this.args.instruction, 0)
  }

  instructionCommands(instruction: Instruction, indentation: number): string[] {
    switch (instruction[0]) {
      case 'set':
        return this.setInstructionCommands(instruction as SetInstruction, indentation)
      case 'while':
        return this.whileInstructionCommands(instruction as WhileInstruction, indentation)
      default:
        return this.defaultInstructionCommands(instruction, indentation)
    }
  }

  setInstructionCommands(instruction: SetInstruction, indentation: number): string[] {
    const [operation, variable, expression] = instruction

    return [
      this.withIndentation(`(${operation} ${variable} ${this.defaultExpressionCommand(expression)})`, indentation),
    ]
  }

  whileInstructionCommands(instruction: WhileInstruction, indentation: number): string[] {
    const condition = instruction[1]
    const body = instruction[2]
    return [`(while ${this.defaultExpressionCommand(condition)} (`]
      .concat(body.flatMap((instruction) => this.instructionCommands(instruction, indentation + 1)))
      .concat(')')
  }

  defaultInstructionCommands(instruction: Instruction, indentation: number): string[] {
    return [this.withIndentation(this.defaultExpressionCommand(instruction), indentation)]
  }

  withIndentation(command: string, indentation: number): string {
    return ' '.repeat(indentation * 4) + command
  }

  defaultExpressionCommand(expression: Expression): string {
    if (typeof expression === 'number') {
      return expression.toString()
    } else {
      return `(${expression.join(' ')})`
    }
  }
}
