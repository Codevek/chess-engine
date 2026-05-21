import { Chess } from "./core/game.js";

const game = new Chess("K3R3/1Q4N1/1Bq1n1P1/1PP1P2P/8/7k/2r1p1b1/8 w - - 0 1");

const moves = game.getMovesForPiece(6,4)
console.log(moves);
game.makeMove(moves[0])
console.table(game.getBoard());


