import { generateFEN } from "./core/fen.js";
import { Chess } from "./core/game.js";

const game = new Chess();

console.table(game.getBoard());
game.makeMove({
    from: [6,4],
    to: [4,4]
})
console.table(game.getBoard());
game.undoMove();
console.table(game.getBoard());
// console.log(game.getLegalMoves(4,2));



// const moves2 = game.getLegalMoves(3, 4);
// console.log(moves2);

// console.table(game.getBoard());
// console.table(game.getBoard());
// const moves2 = game.getLegalMoves(7,4)
// console.log(moves2);
