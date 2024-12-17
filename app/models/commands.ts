export type Val = number
export type Ref = number
export type Src = string

export type AndCmd = ['and', Ref, Ref, Ref]
export type ArgsCmd = ['args', Ref, Val]
export type CopyCmd = ['copy', Ref, Ref]
export type IfCmd = ['if', Ref, Val]
export type UnlessCmd = ['unless', Ref, Val]
export type NotCmd = ['not', Ref, Ref]
export type RestartCmd = ['restart', Ref]
export type ReturnCmd = ['return', Ref]
export type SetCmd = ['set', Ref, Val]
export type ShiftLeftCmd = ['shiftl', Ref, Ref, Val]
export type ShiftRightCmd = ['shiftr', Ref, Ref, Val]
export type StartCmd = ['start', Ref]
export type XorCmd = ['xor', Ref, Ref, Ref]

export type Cmd =
  | AndCmd
  | ArgsCmd
  | CopyCmd
  | IfCmd
  | NotCmd
  | RestartCmd
  | ReturnCmd
  | SetCmd
  | ShiftLeftCmd
  | ShiftRightCmd
  | StartCmd
  | UnlessCmd
  | XorCmd
