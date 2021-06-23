import { connectToDatabase } from 'server_lib/mongodb'
import withSession from 'client_lib/withSession'
import { Chess } from 'chess.js'
import {
	createMatchState,
	findMatchDocument,
	makeMove,
	updateMatchDocument,
} from 'server_lib/helpers/chess/chess'

export default withSession(async (req, res) => {
	const { matchId, move } = req.query

	// const sessionUser = req.session.get('user')

	// if (!sessionUser) return res.status(403)

	try {
		const { db } = await connectToDatabase()

		const matchDoc = await findMatchDocument(db, matchId)

		if (!matchDoc) return res.status(404)

		const afterMoveFen = makeMove(move, matchDoc, '')
		
		if (afterMoveFen) {
			const updateMatchSuccess = await updateMatchDocument(
				db,
				matchId,
				afterMoveFen
			)
			
			if (updateMatchSuccess) {
				const newMatchState = createMatchState(afterMoveMatch, matchDoc.players, matchId)
				return res.status(200).json(newMatchState)
			}
		}

		if (!afterMoveFen) {
			res.json({
				hasError: true,
				message: 'Illegal Move',
			})
		}

		res.status(404)
	} catch (error) {
		console.error(error)
		res.status(500)
	}
})
