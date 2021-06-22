import { connectToDatabase } from 'server_lib/mongodb'
import withSession from 'client_lib/withSession'
import { Chess } from 'chess.js'
import { createMatchState, findMatchDocument, makeMove } from 'server_lib/helpers/chess/chess'

export default withSession(async (req, res) => {
	const { matchId } = req.query
	const { move } = req.params

	const sessionUser = req.session.get('user')
	if (!sessionUser) return res.status(403)

	try {
		const { db } = await connectToDatabase()

		const matchDoc = await findMatchDocument(db, matchId)

		const match = Chess(matchDoc.fenString)

		const afterMove = makeMove(move, match.fen())



		if(afterMove){
			const newMatchState = createMatchState(match, matchDoc.players, matchId)
		}

		if (match) return res.status(200).json(match)

		res.status(404)
	} catch (error) {
		console.error(error)
		res.status(500)
	}
})
