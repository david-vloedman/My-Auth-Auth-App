import { connectToDatabase } from 'server_lib/mongodb'
import withSession from 'client_lib/withSession'
import {
	createMatchState,
	findMatchDocument,
	makeMove,
	updateMatchDocument,
} from 'server_lib/helpers/chess/chess'

export default withSession(async (req, res) => {
	
	const { matchId } = req.query
	const { move } = req.body
	// TODO uncomment when done
	// const sessionUser = req.session.get('user')

	// if (!sessionUser) return res.status(403)
	
	try {
		const { db } = await connectToDatabase()

		const matchDoc = await findMatchDocument(db, matchId)

		if (!matchDoc) return res.status(404)

		const afterMoveMatch = makeMove(move, matchDoc, '')
		
		if (afterMoveMatch) {
			const updateMatchSuccess = await updateMatchDocument(
				db,
				matchId,
				afterMoveMatch.fen()
			)
			
			if (updateMatchSuccess) {
				const newMatchState = createMatchState(
					afterMoveMatch,
					matchDoc.players,
					matchId
				)
				return res.status(200).json(newMatchState)
			}
		}

		if (!afterMoveMatch) {
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
