import { Chess } from "../core/game.js";
import { evaluate } from "./evaluate.js";

export function findBestMove(game, depth) {
  const moves = game.getAllLegalMoves();
  let bestMove = null;
  let score;
  let bestScore

  if (game.getTurn() === "w") {
    bestScore = -Infinity;
  } else {
    bestScore = Infinity;
  }
  if (game.getTurn() === "w") {
    for (const move of moves) {
      game.makeMove(move);
      score = minimax(game, depth - 1, -Infinity, Infinity);
      game.undoMove();

      if (score > bestScore) {
        bestMove = move;
        bestScore = score;
      }
      // console.log(score, bestMove);
    }
  } else {
    for (const move of moves) {
      game.makeMove(move);
      score = minimax(game, depth - 1, -Infinity, Infinity);
      game.undoMove();

      if (score < bestScore) {
        bestMove = move;
        bestScore = score;
      }
    }
  }
  // console.log(bestMove);
  // console.log(score);

  return bestMove;
}

export function minimax(game, depth, alpha, beta) {
  if (depth === 0) {
    return evaluate(game);
  }

  const moves = game.getAllLegalMoves();
  // console.log(moves);
  if (moves.length === 0) {
    if (game.isKingInCheck(game.getTurn())) {
      const CHECKMATE = 100000;
      if (game.getTurn() === "w") return -CHECKMATE + depth;
      return CHECKMATE - depth;
    }
    return 0;
  }

  if (game.getTurn() === "w") {
    let bestScore = -Infinity;
    for (const move of moves) {
      game.makeMove(move);
      let score = minimax(game, depth - 1, alpha, beta);
      game.undoMove();

      bestScore = Math.max(bestScore, score);
      alpha = Math.max(alpha, bestScore);

      if (beta <= alpha) {
        break;
      }
      // console.log(move);
    }
    // console.log(bestScore);

    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const move of moves) {
      game.makeMove(move);
      let score = minimax(game, depth - 1, alpha, beta);
      game.undoMove();

      bestScore = Math.min(bestScore, score);
      beta = Math.min(beta, bestScore);

      if (beta <= alpha) {
        break;
      }
      // console.log(move);
    }
    // console.log(bestScore);
    // console.log(totalMovesCalculated);

    return bestScore;
  }
}

// const game = new Chess("4k3/8/8/8/8/3q4/8/3K4 w - - 0 1");
// console.table(game.getBoard());
// console.log(findBestMove(game, 5));
