import { connectToDatabase } from 'util/mongodb'
import withSession from 'lib/withSession'
import * as Responses from 'lib/helpers/responses'
import { ObjectId } from 'mongodb'

export default withSession(async (req, res) => {
	const sessionUser = req.session.get('user')

	if (!sessionUser) return Responses.forbidden(res)

	const { conversationId } = req.query
	
	if (!conversationId) return Responses.notFound(res, 'Conversation not found')

	try {
		const { db } = await connectToDatabase()
		const conversationsCollection = db.collection('conversations')

		const response = await conversationsCollection.findOne(
			ObjectId(conversationId)
		)

		if (!response) return Responses.notFound(res, 'Conversation not found')

    return res.status(200).json(response)

	} catch (error) {
		console.error(error)
		Responses.serverError(res, '', error)
	}
})
