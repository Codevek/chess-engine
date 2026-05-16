import { Chess } from "./core/game.js";

const game = new Chess("rnb1k1nr/pppp2pp/8/3Qpp2/1bP1PP2/3PB1P1/PP5P/RNq1KBNR b KQkq - 0 1");

game.getAllLegalMoves("b")

//TEST -- 1
// const game = new Chess("rnbqk1nr/pppp2pp/5p2/4p3/1bP5/3P2P1/PP1BPP1P/RN1QKBNR w KQkq - 0 1");
// const test1 = game.getLegalMoves(6,3)
// console.log(`Test1:`,test1);
// Test1: [ { from: [ 6, 3 ], to: [ 5, 2 ] }, { from: [ 6, 3 ], to: [ 4, 1 ] } ]

//TEST -- 2
// const game = new Chess("rnb1k1nr/pppp2pp/8/3Qpp2/1bP1PP2/3PB1P1/PP5P/RNq1KBNR w KQkq - 0 1");
// const test2 = game.getLegalMoves(7,4)
// console.log(game.getMovesForPiece(7,4));
// console.log(`Test2:`, test2);
//Test2: [ { from: [ 7, 4 ], to: [ 6, 4 ] }, { from: [ 7, 4 ], to: [ 6, 5 ] } ]

//TEST -- 3
//const game = new Chess("rnb1k1nr/pppp2pp/8/3Qpp2/1bP1PP2/3PB1P1/PP5P/RNq1KBNR w KQkq - 0 1");
// const moves = game.getMovesForPiece(7,4)
// game.makeMove(moves[2])
// console.table(game.getBoard());



// console.table(game.getBoard());
// const moves = game.getMovesForPiece(1, 4);
// game.makeMove(moves[0])
// console.table(game.getBoard());
// console.log(moves);
// console.trace("false")