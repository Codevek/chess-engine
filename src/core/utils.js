export function isInsideBoard(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

export function getNotation([row, col]){
  const alpha = ["a", "b", "c", "d", "e", "f", "g", "h"]
  const num = [1, 2, 3, 4, 5, 6, 7, 8]
  let notation = ""

  notation+=alpha[col]
  notation+=num[row]

  // console.log(notation);
  return notation
}
getNotation([4,6])