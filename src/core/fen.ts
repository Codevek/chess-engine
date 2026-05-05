import type { Piece } from "../types/piece";

export function parseFen(fen: String) {
  // const boardP = fen.split(" ")
  // const onlyBoard = boardP[0]
  const [onlyBoard] = fen.split(" "); //this line meant above 2 lines
  const rows = onlyBoard?.split("/");

  return rows?.map((row) => {
    const result: (Piece | null)[] = [];
    for (const char of row) {
      if (!isNaN(Number(char))) {
        for (let i = 0; i < Number(char); i++) {
          result.push(null);
        }
      } else {
        const isWhite = char === char.toUpperCase();

        result.push({
          type: char.toLowerCase() as any, //'as any' refers that "ignore type checking here"
          color: isWhite ? "w" : "b",
        });
      }
    }

    console.log(result);
    return result;
  });

}

parseFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')