import Component from '@glimmer/component'
import type { Instruction } from '../models/program'

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
    return this.args.instruction[1]
  }

  get commands(): string[] {
    return this.command(this.args.instruction, 0)
  }

  command(instruction: Instruction, indentation: number): string[] {
    if (instruction.at(-1) instanceof Array) {
      return this.commandWithBody(instruction, indentation)
    } else {
      return [this.commandWithoutBody(instruction, indentation)]
    }
  }

  indent(command: string, indentation: number): string {
    return `${' '.repeat(indentation * 4)} ${command}`
  }

  commandWithBody(instruction: Instruction, indentation: number): string[] {
    const output = []
    output.push(this.indent(`(${instruction.slice(0, -1).join(' ')}`, indentation))

    const body = instruction.at(-1) as Instruction[]
    body.forEach(instruction => {
      output.push(this.command(instruction, indentation + 1))
    })

    output.push(this.indent(')', indentation))
    return output
  }

  commandWithoutBody(instruction: Instruction, indentation: number): string {
    return this.indent(`(${instruction.join(' ')})`, indentation)
  }
}
