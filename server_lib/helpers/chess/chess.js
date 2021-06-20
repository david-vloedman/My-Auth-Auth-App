import { Chess } from 'chess.js'

export const validateMove = (givenFen, gameFen) => {}

export const createMatchState = (match, players, isUsersTurn) => {
	return {
		game: {
			fenString: match.fen(),
			inCheck: match.in_check(),
			inCheckmate: match.in_checkmate(),
			inDraw: match.in_draw(),
			inStalemate: match.in_stalemate(),
			isOver: match.game_over(),
			turn: match.turn(),
			players,
		},
		player: {
			availableMoves: isUsersTurn ? match.moves() : [],
		},
	}
}

export const createNewMatch = (uid, fid, whitePlayer) => {
	const newMatch = new Chess().fen()
	const players = {}

	if ((whitePlayer && whitePlayer !== uid) || whitePlayer !== fid) {
		throw new Error('white player given does not match either opponent')
	}

	if (!whitePlayer) {
		players.white = flipCoin() ? uid : fid
	} else {
		players.white = whitePlayer
	}

	players.black = white === uid ? fid : uid

	return { newMatch, players }
}

const flipCoin = () => {
	return Math.random() % 2 === 0
}

/**
 * Inserts a given fenString and players into the DB
 * @param {*} db
 * @param {*} match
 */
export const insertNewMatchDocument = async (db, fenString, players) => {
	const insertResponse = await db.collection('chessMatches').insertOne({
		fenString,
		players,
	})
}

export const removeMatchDocument = async (db, mid) => {}

export const updateMatchDocument = async (db, mid, update) => {}

export const findMatchDocument = async (db, mid) => {}
