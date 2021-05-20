import { connectToDatabase } from 'util/mongodb'
import withSession from 'lib/withSession'
import { Chess } from 'chess.js'

export default withSession(async (req, res) => {
	const { friendId } = req.query

	const sessionUser = req.session.get('user')

	if (!sessionUser) return res.status(403)

	const players = flipCoin()
		? { white: friendId, black: sessionUser._id }
		: { white: sessionUser._id, black: friendId }

	const newMatch = new Chess()

	try {
		const { db } = await connectToDatabase()

		const mongoInsert = await db.collection('chessMatches').insertOne({
			fenString: newMatch.fen(),
			players,
		})

		if (mongoInsert?.result?.ok) {
			const isUsersTurn = players.white === sessionUser._id

			const matchState = createMatchState(newMatch, players, isUsersTurn)

			return res.status(200).json({
				...matchState,
			})
		}

		throw new Error('Failed to create match')
	} catch (error) {
		console.error(error)
		res.status(500)
	}
})

const flipCoin = () => {
	return Math.random() % 2 === 0
}

const createMatchState = (match, players, isUsersTurn) => {
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
