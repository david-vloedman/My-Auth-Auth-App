import { connectToDatabase } from '../../../util/mongodb'
import withSession from '../../../lib/withSession'
import * as Responses from '../../../lib/helpers/responses'
import { ObjectId } from 'mongodb'
import getAppState from '../../../lib/helpers/getAppState'

export default withSession(async (req, res) => {
	const sessionUser = req.session.get('user')

	if (!sessionUser) return Responses.forbidden(res)

	const { conversationId, messageBody } = req.body

	try {
		const { db } = await connectToDatabase()
		const conversations = db.collection('conversations')

		const newMessage = {
			sentAt: new Date(),
			body: messageBody,
			sentBy: sessionUser._id,
			previous: null,
		}

		const updateResult = await conversations.updateOne(
			{ _id: conversationId },
			{ $push: { messages: newMessage } }
		)

    console.log(updateResult)
		
	} catch (error) {
		console.error(error)
		Responses.serverError(res, error)
	}
})
