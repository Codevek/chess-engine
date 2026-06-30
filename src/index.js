import { findBestMove } from "./ai/minimax.js";
import { generateFEN } from "./core/fen.js";
import { Chess } from "./core/game.js";
import readline from "node:readline/promises";

const game = new Chess();

// // game.makeMove({ from: [ 1, 6 ], to: [ 3, 4 ] })
// console.table(game.getBoard());
// console.log(findBestMove(game, 3));

for (let i = 0; i < 50; i++) {
  console.table(game.getBoard());
  if (game.getTurn() === "w") {
    const moves = game.getAllLegalMoves();
    console.log(moves);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const answer = await rl.question("Make ur move?");
    game.makeMove(moves[answer]);
    // console.log(generateFEN(game));
    rl.close(); // Remember to close the stream to exit the process
  }
  else{
   const move = findBestMove(game, 3)
   game.makeMove(move)
  }
}
