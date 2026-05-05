export type Color = "w" | "b";

export type PieceType =
  | "p" //pawn
  | "r" //rook
  | "n" //knight
  | "b" //bishop
  | "q" //queen
  | "k"; //king

export interface Piece {
  type: PieceType;
  color: Color;
}