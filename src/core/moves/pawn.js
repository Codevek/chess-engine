import { isInsideBoard } from "../utils.js";
import { parseFEN } from "../fen.js";

export function getPawnMoves(board, pRow, pCol, piece) {
  const moves = [];

  const rowDir = piece.color === "w" ? -1 : 1; //-1 from the W2B side and +1 from the B2W side

  const startRow = piece.color === "w" ? 6 : 1;

  // singleForward Move
  const forwardRow = pRow + rowDir;

  if (
    isInsideBoard(forwardRow, pCol) &&
    !board[forwardRow][pCol]
  ) {
    moves.push({
      from: [pRow, pCol],
      to: [forwardRow, pCol],
    });

    // doubleForward Move
    if (
      pRow === startRow &&
      !board[forwardRow][pCol] && //for firstSquare mt
      !board[pRow + 2 * rowDir][pCol] //for secondSquare mt
    ) {
      moves.push({
        from: [pRow, pCol],
        to: [pRow + 2 * rowDir, pCol],
      });
    }
  }

  // diagonalCapture
  for (const colDir of [-1, 1]) {
    const pNewCol = pCol + colDir;
    const pNewRow = pRow + rowDir;

    if (!isInsideBoard(pNewRow, pNewCol)) continue; //its for safety, like if the pawn is in the edge of the board so outside the board would be illegal move, nd this "continue" thing will take us outside the "for" loop directly without running anything else below

    const target = board[pNewRow][pNewCol];

    if (target && target.color !== piece.color) {
      moves.push({
        from: [pRow, pCol],
        to: [pNewRow, pNewCol],
      });
    }
  }
  
  // console.log(piece);
  return moves;
}

// getPawnMoves(
//   parseFEN("8/4Q3/pPb5/RP4p1/1K2p3/5PP1/2R1q3/2br3k w - - 0 1"),
//   6,
//   2,
//   parseFEN("8/4Q3/pPb5/RP4p1/1K2p3/5PP1/2R1q3/2br3k w - - 0 1")[6][2]
// );