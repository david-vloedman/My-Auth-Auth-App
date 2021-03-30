import { connectToDatabase } from '../../../util/mongodb'
import withSession from '../../../lib/withSession'
import * as Responses from '../../../lib/helpers/responses'

export default withSession(async (req, res) => {
	const sessionUser = req.session.get('user')

	if (!sessionUser) return Responses.forbidden(res)

	const { recipientId } = req.body

	if (!recipientId) return Responses.serverError(res, 'Malformed Request')

	try {
		const { db } = await connectToDatabase()
		const conversations = db.collection('conversations')

		const newConversation = {
			participants: [sessionUser._id, recipientId],
		}

		const insertResponse = await conversations.insertOne(newConversation)

		if (insertResponse.result.ok) {
			return Responses.ok(res, '', newConversation)
		}
	} catch (error) {
		console.error(error)
		Responses.serverError(res, error)
	}
})
