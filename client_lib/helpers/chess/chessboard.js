export const onDragStart = (source, piece, position, orientation) => {console.log('test')}

export const onDragMove = (
	newLocation,
	oldLocation,
	source,
	piece,
	position,
	orientation
) => (match) => {}

export const onDrop = (source, target, piece, newPos, oldPos, orientation) => (
	match
) => {}

export const onMoveEnd = (oldPos, newPos) => (match) => {}


export const onSquareClick = (square) => {
	console.log(square)
}

