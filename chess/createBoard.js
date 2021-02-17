export const alphabet = 'abcdefghijklmnopqrstuvwyxz'

const createSquare = (rank,file, currentPiece) => {
	const notation = `${alphabet[file]}${rank+1}`
  
  return {
  	id: notation,
    currentPiece
  }
}


const createBoard = (x, y) => {
  
  const board = []

  for (let i = 0; i < x; i++) {
    const row = []
    for (let ii = 0; ii < y; ii++) {
      row.push(createSquare(i, ii))
    }
    board.push(row)
  }
  return board
}

export default createBoard