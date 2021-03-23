import { connectToDatabase } from '../../../../util/mongodb'
import withSession from '../../../../lib/withSession'
import * as Responses from '../../../../lib/helpers/responses'
import { ObjectId } from 'mongodb'
import getAppState from '../../../../lib/helpers/getAppState'

export default withSession(async (req, res) => {
	const sessionUser = req.session.get('user')

	if (!sessionUser) return Responses.forbidden(res)

	const {
		recipientId,
		message
	} = req.body
	console.log(recipientId, message)
	if (!recipientId || !message)
		return Responses.serverError(res, 'Malformed Request')

	try {
		const { db } = await connectToDatabase()
		const conversations = db.collection('conversations')

    const newMessage = {
      sentAt: new Date(),
      message,
      sentBy: sessionUser._id,
      previous: null,
    }

		const newConversation = {
			participants: [sessionUser._id, recipientId],
			messages: [newMessage]
		}

    const insertResponse = await conversations.insertOne(newConversation)

    if(insertResponse.result.ok){
      console.log(insertResponse.result)
      return Responses.ok(res, '', insertResponse)
    }

	} catch (error) {
		console.error(error)
		Responses.serverError(res, error)
	}
})
