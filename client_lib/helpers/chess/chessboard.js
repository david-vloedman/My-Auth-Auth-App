import {makeMove} from 'client_lib/helpers/chess/chess'

export const onDragStart = (source, piece, position, orientation) => {console.log('test')}

export const onDragMove = (
	newLocation,
	oldLocation,
	source,
	piece,
	position,
	orientation
) => (match) => {}

export const onDrop = (dispatch, matchState, userId) => (source, target, piece, newPos, oldPos, orientation) => {
	console.log(source)
	const result = makeMove(dispatch, {to: source.targetSquare, from: source.sourceSquare},  matchState, userId)
}


export const onMoveEnd = (oldPos, newPos) => (match) => {}


export const onSquareClick = (square) => {
	console.log(square)
}

