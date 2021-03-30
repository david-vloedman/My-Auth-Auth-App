import { connectToDatabase } from 'util/mongodb'
import withSession from 'lib/withSession'
import * as Responses from 'lib/helpers/responses'

export default withSession(async (req, res) => {
	const sessionUser = req.session.get('user')

	if (!sessionUser) return res.status(403)

	const { recipientId } = req.query

	if (!recipientId)
		return res.status(500).json({
			message: 'forbidden',
		})

	try {
		const { db } = await connectToDatabase()
		const conversations = db.collection('conversations')

		const newConversation = {
			participants: [sessionUser._id, recipientId],
		}

		const insertResponse = await conversations.insertOne(newConversation)

		if (insertResponse.result.ok) {
			return res.status(200).json({
				...insertResponse.ops[0],
			})
		}

		Responses.serverError(
			res,
			'Unknown error, failed to create conversation',
			insertResponse
		)
	} catch (error) {
		console.error(error)
		Responses.serverError(res, error)
	}
})
