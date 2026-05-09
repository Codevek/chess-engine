import { parseFEN } from "./fen.js";
import { getPawnMoves } from "./moves/pawn.js";

const START_FEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export class Chess {
  constructor(fen = START_FEN) {
    this.board = parseFEN(fen);

    this.turn = fen.split(" ")[1];
  }

  getBoard() {
    return this.board;
  }

  getMovesForPiece(pRow, pCol) {
    const piece = this.board[pRow][pCol];

    if (!piece) return [];

    switch (piece.type) {
      case "p":
        return getPawnMoves(
          this.board,
          pRow,
          pCol,
          piece
        );
      case "r":
        return getRookMoves(
          this.board,
          pRow,
          pCol,
          piece
        )

      default:
        return [];
    }
  }
}