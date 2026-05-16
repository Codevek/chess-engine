import { parseFEN } from "../fen.js";
import { isInsideBoard } from "../utils.js";

export function getKingMoves(board, pRow, pCol, piece) {
  const moves = [];
  const direction = [
    [-1, 0], //top
    [1, 0], //bottom
    [0, 1], //right
    [0, -1], //left

    [-1, -1], //topLeft
    [-1, 1], //topRight
    [1, -1], //botLeft
    [1, 1], //botRight
  ];

  for (const [rowDir, colDir] of direction) {
    let pNewRow = pRow + rowDir;
    let pNewCol = pCol + colDir;

    if (!isInsideBoard(pNewRow, pNewCol)) continue;
    const target = board[pNewRow][pNewCol];
    if (target === null) {
      moves.push({
        from: [pRow, pCol],
        to: [pNewRow, pNewCol],
      });
    } else if (target.color !== piece.color) {
      moves.push({
        from: [pRow, pCol],
        to: [pNewRow, pNewCol],
      });
    }
  }

  return moves;
}

// getKingMoves(
//   parseFEN("3qN3/7K/1k1P4/R3bp2/P5R1/1b1ppP2/5Pp1/8 w - - 0 1"),
//   3,
//   5,
//   parseFEN("3qN3/7K/1k1P4/R3bp2/P5R1/1b1ppP2/5Pp1/8 w - - 0 1")[3][5],
// );