import { connectToDatabase } from 'server_lib/mongodb'
import withSession from 'client_lib/withSession'
import { initializeGame } from 'server_lib/helpers/chess/chess'

export default withSession(async (req, res) => {
	const { friendId } = req.query

	const sessionUser = req.session.get('user')
	
	if (!sessionUser) return res.status(403)

	try {
		const { db } = await connectToDatabase()
		console.log(friendId)
		const matchState = await initializeGame(db, sessionUser._id, friendId)
		
		return res.status(200).json(matchState.game.matchId)
	} catch (error) {
		console.error(error)
		res.status(500)
	}
})
