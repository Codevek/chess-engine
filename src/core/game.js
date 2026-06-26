import { parseFEN } from "./fen.js";
import { getBishopMoves } from "./moves/bishop.js";
import { getKnightMoves } from "./moves/knight.js";
import { getPawnMoves } from "./moves/pawn.js";
import { getQueenMoves } from "./moves/queen.js";
import { getRookMoves } from "./moves/rook.js";
import { getKingMoves } from "./moves/king.js";
import { isInsideBoard } from "./utils.js";
import { PieceType } from "../types/piece.js";

const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export class Chess {
  constructor(fen = START_FEN) {
    this.board = parseFEN(fen);
    this.history = [];

    this.turn = fen.split(" ")[1];

    const castleSide = fen.split(" ")[2];
    if (castleSide === "-") {
      this.castlingRights = null;
    } else {
      this.castlingRights = {
        w: {
          kingSide: castleSide.includes("K") ? true : false,
          queenSide: castleSide.includes("Q") ? true : false,
        },

        b: {
          kingSide: castleSide.includes("k") ? true : false,
          queenSide: castleSide.includes("q") ? true : false,
        },
      };
    }
    const epField = fen.split(" ")[3];

    if (epField === "-") {
      this.enPassantTarget = null;
    } else {
      const file = epField.charCodeAt(0) - 97; //convert the alphabets into numbers

      const rank = Number(epField[1]);

      this.enPassantTarget = [8 - rank, file];
    }

    const fields = fen.split(" ");
    this.halfMoveClock = Number(fields[4]);
    this.fullMoveNumber = Number(fields[5]);
  }

  getBoard() {
    return this.board;
  }

  getTurn() {
    return this.turn;
  }

  getMovesForPiece(pRow, pCol, includeCastle = true) {
    const piece = this.board[pRow][pCol];

    if (!piece) return [];

    switch (piece.type) {
      case "p":
        return getPawnMoves(this, this.board, pRow, pCol, piece);

      case "r":
        return getRookMoves(this.board, pRow, pCol, piece);

      case "b":
        return getBishopMoves(this.board, pRow, pCol, piece);

      case "q":
        return getQueenMoves(this.board, pRow, pCol, piece);

      case "n":
        return getKnightMoves(this.board, pRow, pCol, piece);

      case "k":
        return getKingMoves(this, this.board, pRow, pCol, piece, includeCastle);

      default:
        return [];
    }
  }

  makeMove(moveMade) {
    const [fromRow, fromCol] = moveMade.from;
    const [toRow, toCol] = moveMade.to;

    const piece = this.board[fromRow][fromCol];
    const capturedPiece = this.board[toRow][toCol];

    const historyEntry = {
      move: structuredClone(moveMade),
      movedPiece: structuredClone(piece),
      capturedPiece: structuredClone(capturedPiece),
      previousCastlingRights: structuredClone(this.castlingRights),

      previousEnPassant: structuredClone(this.enPassantTarget),

      previousHalfMoveClock: this.halfMoveClock,

      previousFullMoveNumber: this.fullMoveNumber,
    };
    this.history.push(historyEntry);

    if (!piece) return false;

    //piece2NewPosition
    this.board[toRow][toCol] = piece;
    //emptyLastPosition
    this.board[fromRow][fromCol] = null;
    //changeTurn
    this.turn = this.turn === "w" ? "b" : "w";

    let enPassantCapturedPiece = null;

    if (moveMade.enPassant) {
      if (piece.color === "w") {
        enPassantCapturedPiece = structuredClone(this.board[toRow + 1][toCol]);
      } else {
        enPassantCapturedPiece = structuredClone(this.board[toRow - 1][toCol]);
      }
    }

    //enPassant capture removal
    if (moveMade.enPassant) {
      if (piece.color === "w") {
        this.board[toRow + 1][toCol] = null;
      } else {
        this.board[toRow - 1][toCol] = null;
      }
    }

    //pawnPromotionToQueen
    if (piece.type === "p") {
      if (piece.color === "w" && toRow === 0) {
        piece.type = "q";
      }
      if (piece.color === "b" && toRow === 7) {
        piece.type = "q";
      }
    }

    //removingCastlingRights
    if (piece.type === "k") {
      this.castlingRights[piece.color].kingSide = false;
      this.castlingRights[piece.color].queenSide = false;
    }

    if (piece.type === "r") {
      //whiteSIde
      if (piece.color === "w") {
        if (fromRow === 7 && fromCol === 0) {
          this.castlingRights.w.queenSide = false;
        }
        if (fromRow === 7 && fromCol === 7) {
          this.castlingRights.w.kingSide = false;
        }
      }
      //blackSide
      else {
        if (fromRow === 0 && fromCol === 0) {
          this.castlingRights.b.queenSide = false;
        }
        if (fromRow === 0 && fromCol === 7) {
          this.castlingRights.b.kingSide = false;
        }
      }
    }
    // console.log(this.castlingRights);
    if (moveMade.castle === "w-kingSide") {
      this.board[7][5] = this.board[7][7];

      this.board[7][7] = null;
    }
    if (moveMade.castle === "w-queenSide") {
      this.board[7][3] = this.board[7][0];

      this.board[7][0] = null;
    }
    if (moveMade.castle === "b-kingSide") {
      this.board[0][5] = this.board[0][7];

      this.board[0][7] = null;
    }
    if (moveMade.castle === "b-queenSide") {
      this.board[0][3] = this.board[0][0];

      this.board[0][0] = null;
    }

    //enPassant history logic
    if (piece.type === "p" && Math.abs(toRow - fromRow) === 2) {
      const middleRow = (toRow + fromRow) / 2;
      this.enPassantTarget = [middleRow, fromCol];
    } else {
      this.enPassantTarget = null;
    }

    //halfMove nd fullMove updation
    if (piece.type === "p" || capturedPiece !== null) {
      this.halfMoveClock = 0;
    } else {
      this.halfMoveClock++;
    }

    if (piece.color === "b") {
      this.fullMoveNumber++;
    }

    return true;
  }

  isSquareAttacked(row, col, byColor) {
    let includeCastle = false;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];

        if (!piece) continue;

        if (piece.color !== byColor) continue;

        const moves = this.getMovesForPiece(r, c, false);

        for (const move of moves) {
          const [toRow, toCol] = move.to;

          if (toRow === row && toCol === col) {
            return true;
          }
        }
      }
    }

    return false;
  }

  findKing(color) {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];

        if (piece && piece.type === "k" && piece.color === color) {
          return [r, c];
        }
      }
    }

    return null;
  }

  isKingInCheck(color) {
    const kingPos = this.findKing(color);

    if (!kingPos) {
      return false;
    }
    const [kingRow, kingCol] = kingPos;
    const enemyColor = color === "w" ? "b" : "w";

    return this.isSquareAttacked(kingRow, kingCol, enemyColor);
  }

  getLegalMoves(pRow, pCol) {
    const piece = this.board[pRow][pCol];

    if (!piece) return [];

    if (piece.color !== this.turn) {
      return [];
    }
    const pseudoMoves = this.getMovesForPiece(pRow, pCol);
    const legalMoves = [];

    for (const move of pseudoMoves) {
      const boardBackup = structuredClone(this.board);
      const turnBackup = this.turn;
      const castlingBackup = structuredClone(this.castlingRights);
      const enPassantBackup = structuredClone(this.enPassantTarget);
      const halfMoveBackup = this.halfMoveClock;
      const fullMoveBackup = this.fullMoveNumber;

      //analyse or xpected move to check the legality
      this.makeMove(move);

      if (!this.isKingInCheck(piece.color)) {
        legalMoves.push(move);
      }

      this.board = boardBackup;
      this.turn = turnBackup;
      this.castlingRights = castlingBackup;
      this.enPassantTarget = enPassantBackup;
      this.halfMoveClock = halfMoveBackup;
      this.fullMoveNumber = fullMoveBackup;
    }
    return legalMoves;
  }

  getAllLegalMoves() {
    const allLegalMoves = [];
    const color = this.turn;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];

        if (!piece) continue;

        if (piece.color !== color) continue;

        const legalMoves = this.getLegalMoves(r, c);

        allLegalMoves.push(...legalMoves);
      }
    }

    return allLegalMoves;
  }

  isCheckmate(color) {
    const inCheck = this.isKingInCheck(color);
    if (!inCheck) {
      return false;
    }
    const legalMoves = this.getAllLegalMoves(color);
    return legalMoves.length === 0;
  }
  isStalemate(color) {
    const inCheck = this.isKingInCheck(color);
    if (inCheck) {
      return false;
    }
    const legalMoves = this.getAllLegalMoves(color);
    return legalMoves.length === 0;
  }

  undoMove() {
    const historyEntry = this.history.pop();
    if (!historyEntry) return false;

    const { move, movedPiece, capturedPiece } = historyEntry;

    const [fromRow, fromCol] = move.from;
    const [toRow, toCol] = move.to;

    this.board[fromRow][fromCol] = movedPiece;
    this.board[toRow][toCol] = capturedPiece;

    if (move.castle === "w-kingSide") {
      this.board[7][7] = this.board[7][5];
      this.board[7][5] = null;
    }
    if (move.castle === "w-queenSide") {
      this.board[7][0] = this.board[7][3];
      this.board[7][3] = null;
    }
    if (move.castle === "b-kingSide") {
      this.board[0][7] = this.board[0][5];
      this.board[0][5] = null;
    }
    if (move.castle === "b-queenSide") {
      this.board[0][0] = this.board[0][3];
      this.board[0][3] = null;
    }

    if (move.enPassant) {
      if (movedPiece.color === "w") {
        this.board[toRow + 1][toCol] = historyEntry.enPassantCapturedPiece;
      } else {
        this.board[toRow - 1][toCol] = historyEntry.enPassantCapturedPiece;
      }
    }

    this.turn = movedPiece.color;

    this.castlingRights = historyEntry.previousCastlingRights;

    this.enPassantTarget = historyEntry.previousEnPassant;

    this.halfMoveClock = historyEntry.previousHalfMoveClock;

    this.fullMoveNumber = historyEntry.previousFullMoveNumber;
  }
}
