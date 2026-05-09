// export function isInsideBoard(row, column){
//     const ans = row>=0 && row<8 && column>=0 && column<8
//     return ans
// }

export function isInsideBoard(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}