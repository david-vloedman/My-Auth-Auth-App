import { ObjectID } from 'bson'
import { Chess } from 'chess.js'

const matchCollectionString = 'chessMatches'
/**
 *
 * @param {*} db
 * @param {*} param1
 * @returns
 */
export const initializeGame = async (db, uid, fid, whitePlayer) => {
	const { match, players } = createNewMatchObj(uid, fid)

	try {
		const matchId = await insertNewMatchDocument(db, match.fen(), players)
		if (matchId) {
			const matchState = createMatchState(match, players, matchId)

			return matchState
		}
	} catch (error) {
		console.error(error)
	}

	return null
}

export const loadExistingGame = async (db, mid) => {
	try {
		const matchDoc = await findMatchDocument(db, mid)

		const match = new Chess(matchDoc.fenString)

		return createMatchState(match, matchDoc.players, matchDoc._id)
	} catch (error) {
		console.error(error)
	}
}

/**
 *
 * @param {*} move
 * @param {*} gameFen
 * @returns
 */
export const makeMove = (move, matchDoc, sessionUser) => {
	const match = new Chess(matchDoc.fenString)
	// TODO uncomment this check when done testing the API
	// if(isPlayersTurn(match, sessionUser, matchDoc.players)){
	const moveObj = match.move(move)
	return moveObj ? match.fen() : null
	// }
}
/**
 * Verifies that the move being made is by the correct player
 * @param {*} match
 * @param {*} userId
 * @param {*} players
 * @returns
 */
const isPlayersTurn = (match, userId, players) => {
	const turn = match.turn()
	if (turn === 'b') {
		return players.black === userId
	}

	return players.white === userId
}
/**
 * Creates a match state object
 * @param {*} match
 * @param {*} players
 * @param {*} mid
 * @returns
 */
export const createMatchState = (match, players, mid, userId) => {
	return {
		game: {
			matchId: mid,
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
			availableMoves: isPlayersTurn(match, userId, players)
				? match.moves()
				: [],
		},
	}
}

export const createNewMatchObj = (uid, fid) => {
	const newMatch = new Chess()
	const players = {}

	players.white = flipCoin() ? uid : fid
	// set the black player to whichever is not white
	players.black = players.white === uid ? fid : uid
	
	return { match: newMatch, players }
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
	try {
		const dbResponse = await db.collection(matchCollectionString).insertOne({
			fenString,
			players,
		})

		return dbResponse.insertedId
	} catch (error) {
		console.error(error)
		console.error(error.stack)
	}
}

/**
 * Removes the match document
 * @param {*} db
 * @param {*} mid
 */
export const removeMatchDocument = async (db, mid) => {}
/**
 * Updates the match document
 * @param {*} db
 * @param {*} mid
 * @param {*} newFen
 */
export const updateMatchDocument = async (db, mid, newFen) => {
	try {
		const dbResponse = await db.collection(matchCollectionString).updateOne(
			{ _id: ObjectID(mid) },
			{
				$set: {
					fenString: newFen,
				},
			}
		)
		console.log(dbResponse)
		return dbResponse?.result?.n === 1
	} catch (error) {
		console.error(error)
		console.error(error.stack)
		return false
	}
}
/**
 * Retrieves the match document
 * @param {*} db
 * @param {*} mid
 */
export const findMatchDocument = async (db, mid) => {
	try {
		const dbResponse = await db
			.collection(matchCollectionString)
			.findOne(ObjectID(mid))

		return dbResponse
	} catch (error) {
		console.error(error)
		console.error(error.stack)
	}
}
