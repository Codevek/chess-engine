export const Color = "w" | "b";

export const PieceType = "p" //pawn
                       | "r" //rook
                       | "n" //knight
                       | "b" //bishop
                       | "q" //queen
                       | "k"; //king

export const Piece = {
  type: PieceType,
  color: Color
}