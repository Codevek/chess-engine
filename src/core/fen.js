import { Color, Piece } from "../types/piece.js";
import { PieceType } from "../types/piece.js";
import { Chess } from "./game.js";
import { getNotation } from "./utils.js";

export function parseFEN(fen) {
  const [boardPart = ""] = fen.split(" ");

  const rows = boardPart.split("/");

  return rows.map((row) => {
    const result = [];

    for (const char of row) {
      if (!isNaN(Number(char))) {
        const empty = Number(char);

        for (let i = 0; i < empty; i++) {
          result.push(null);
        }
      } else {
        const isWhite = char === char.toUpperCase();

        result.push({
          type: char.toLowerCase(),
          color: isWhite ? "w" : "b",
        });
      }
    }
    // console.log(result[0]);

    return result;
  });
}
// console.table(parseFEN("r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1"))
// const newboard = parseFEN("7q/1n1r2P1/5N2/1p2k2p/2p4n/1PK3P1/p7/R1B5 w - - 0 1")

// // // console.log(!newboard[4][4]); //this means wheather its null or not (true ==  null  or false == !null(i.e some piece is there))
// console.log(newboard[6][1]);

export function generateFEN(game) {
  const board = game.getBoard();
  const turn = game.getTurn();
  const castlingRights = game.castlingRights;
  const enPassantTarget = game.enPassantTarget

  let fen = "";
  const rows = [];
  for (const row of board) {
    let fenRow = "";
    let mtCount = 0;
    for (const piece of row) {
      if (piece === null) mtCount++;
      else {
        if (mtCount > 0) {
          fenRow += mtCount;
          mtCount = 0;
        }
        let symbol = piece.type;
        if (piece.color === "w") {
          symbol = symbol.toUpperCase();
        }
        fenRow += symbol;
      }
    }
    if (mtCount > 0) {
      fenRow += mtCount;
    }
    rows.push(fenRow);
  }
  fen += rows.join("/");
  fen += " " + turn + " ";
  if (castlingRights !== null) {
    if (castlingRights.w.kingSide === true) fen += "K";
    if (castlingRights.w.queenSide === true) fen += "Q";
    if (castlingRights.b.kingSide === true) fen += "k";
    if (castlingRights.b.queenSide === true) fen += "q";
  }
  else{
    fen += "-"
  }

  if(enPassantTarget){
    fen+= " "+ getNotation(enPassantTarget)
  }

  console.log(fen);

  return rows.join("/");
}

const game = new Chess("rnbqkbnr/pp3ppp/8/2pPp3/8/4p3/PPP2PPP/RNBQKBNR w KQkq e6 0 1");
generateFEN(game);
