import { Chess } from "./core/game.js";

const game = new Chess("5Rb1/Bp6/4p3/1Pppn1k1/3p2P1/Pr3pK1/8/8 w - - 0 1");

const moves = game.getMovesForPiece(4,1);

console.log(moves);