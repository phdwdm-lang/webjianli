export interface ThoughtNote {
  id: string;
  title: string;
  source: string;
  thought: string;
  bgColor: string;
  accentColor: string;
  date?: string;
  image?: string | null;
  imageCaption?: string | null;
  imageWidth?: number;
  imageHeight?: number;
  imageOnly?: boolean;
}

export interface NotePosition {
  id: ThoughtNote["id"];
  x: number;
  y: number;
  r: number;
}

export type NoteVariant =
  | "diary-border"
  | "diary-date"
  | "diary-tape"
  | "snippet"
  | "tape-center"
  | "tape-yellow"
  | "tape-side-date"
  | "tape-purple"
  | "tape-irregular"
  | "pin-round"
  | "pin-center"
  | "clip"
  | "minimal"
  | "badge"
  | "warm-bar"
  | "polaroid"
  | "corner-photo"
  | "tape-portrait-photo";

export type NoteDisplayFont =
  | "default"
  | "handwriting"
  | "longcang"
  | "xiaowei"
  | "zhimang";

export interface NoteStyleMapItem {
  variant: NoteVariant;
  width: number;
  backgroundColor?: string;
  accentColor?: string;
  borderColor?: string;
  decoratorColor?: string;
  eyebrow?: string;
  hint?: string;
  day?: string;
  monthYear?: string;
  sideLabel?: string;
  displayFont?: NoteDisplayFont;
  titleNoWrap?: boolean;
}
