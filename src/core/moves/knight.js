import { parseFEN } from "../fen.js";
import { isInsideBoard } from "../utils.js";

export function getKnightMoves(board, pRow, pCol, piece) {
  const moves = [];
  const direction = [
    [-2, 1], //topRight
    [-2, -1], //topLeft
    [2, 1], //botRight
    [2, -1], //botLeft

    [-1, 2], //rightTop
    [1, 2], //rightBot
    [-1, -2], //leftTop
    [1, -2], //leftBot
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
  // console.log(moves);

  return moves;
}

// getKnightMoves(
//   parseFEN("3qN3/7K/1k1P4/R3bp2/P5R1/1b1ppP2/5Pp1/8 w - - 0 1"),
//   3,
//   5,
//   parseFEN("3qN3/7K/1k1P4/R3bp2/P5R1/1b1ppP2/5Pp1/8 w - - 0 1")[3][5],
// );
