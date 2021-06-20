import { connectToDatabase } from 'server_lib/mongodb'
import withSession from 'client_lib/withSession'

export default withSession(async (req, res) => {
	const { uid } = req.query

	const sessionUser = req.session.get('user')

	if (!sessionUser) return res.status(403)

	try {
		const { db } = await connectToDatabase()

		const conversation = await db
			.collection('conversations')
			.find({
				participants: {
					$all: [uid, sessionUser._id],
				},
			})
			.toArray()

		return conversation.length == 1
			? res.status(200).json(conversation[0])
			: res.status(200).json({})
	} catch (error) {
		console.error(error)
		res.status(500)
	}
})
