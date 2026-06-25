import { Chess } from "./core/game.js";

const game = new Chess("8/5P1q/6p1/3k2P1/R2pp3/P1bP2N1/1p6/1K1nQ3 w - - 0 1");

console.table(game.getBoard());
// const moves1 = game.getLegalMoves(1, 7);
// console.log(moves1);
// // console.table(game.getBoard()R);
// game.makeMove(moves1[0]);
// console.table(game.getBoard());
// const moves2 = game.getLegalMoves(3, 4);
// console.log(moves2);

// console.table(game.getBoard());
// game.makeMove({
//     from: [7,5],
//     to: [7,4]
// })
// console.table(game.getBoard());
// const moves2 = game.getLegalMoves(7,4)
// console.log(moves2);
