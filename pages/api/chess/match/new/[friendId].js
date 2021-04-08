import { connectToDatabase } from 'util/mongodb'
import withSession from 'lib/withSession'
import { Chess } from 'chess.js'

export default withSession(async (req, res) => {
	const { friendId } = req.query

	const sessionUser = req.session.get('user')

	if (!sessionUser) return res.status(403)

	const players = flipCoin()
		? { white: friendId, black: sessionUser._id }
		: { white: sessionUser._id, black: friendId}

	const newGame = new Chess()

	try {
		const { db } = await connectToDatabase()

		const mongoInsert = await db.collection('chessMatches').insertOne({
			fenString: newGame.fen(),
			players
		})

		if (mongoInsert?.result?.ok) {
			return res.status(200).json({
				...mongoInsert.ops[0],
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
