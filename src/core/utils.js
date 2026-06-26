export function isInsideBoard(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

export function getNotation([row, col]){
  const alpha = ["a", "b", "c", "d", "e", "f", "g", "h"]
  const num = [8,7,6,5,4,3,2,1]
  let notation = ""

  notation+=alpha[col]
  notation+=num[row]

  // console.log(notation);
  return notation
}
getNotation([4,6])