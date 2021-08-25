import { connectToDatabase } from 'server_lib/mongodb'
import withSession from 'client_lib/withSession'
import { Chess } from 'chess.js'
import { ObjectID } from 'bson'

export default withSession(async (req, res) => {
	const { matchId } = req.query
	console.log(matchId)
	const sessionUser = req.session.get('user')

	if (!sessionUser) return res.status(403)

	try {
		const { db } = await connectToDatabase()

		const match = await db.collection('chessMatches').findOne(ObjectID(matchId))
		console.log(match)
    if(match) return res.status(200).json(match)

    res.status(404)
    
	} catch (error) {
		console.error(error)
		res.status(500)
	}
})

