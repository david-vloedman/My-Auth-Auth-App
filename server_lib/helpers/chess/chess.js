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
	try {
		const playersObj = await createPlayersObj(db, uid, fid)
		const { match, players } = createNewMatchObj(
			playersObj.user,
			playersObj.friend
		)
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

const createPlayersObj = async (db, uid, fid) => {
	try {
		const user = await db
			.collection('users')
			.findOne(ObjectID(uid), { projection: { userName: 1, rank: 1, _id: 1 } })

		const friend = await db
			.collection('users')
			.findOne(ObjectID(fid), { projection: { userName: 1, rank: 1, _id: 1 } })

		return { user: user, friend: friend }
	} catch (error) {
		console.error(error)
	}
}

export const loadExistingGame = async (db, mid, userId) => {
	try {
		const matchDoc = await findMatchDocument(db, mid)

		const match = new Chess(matchDoc.fenString)

		return createMatchState(match, matchDoc.players, matchDoc._id, userId)
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
	
	if (isPlayersTurn(match, sessionUser, matchDoc.players)) {
		const moveObj = match.move(move)
		return moveObj ? match : null
	}
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
		return `${players.black._id}` === userId
	}

	return `${players.white._id}` === userId
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
			color: `${players.white._id}` === userId ? 'white' : 'black',
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
	return Math.floor(Math.random() * 2 + 1) === 1
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
			startedOn: new Date().toDateString(),
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
