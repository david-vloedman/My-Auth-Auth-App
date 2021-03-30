import { connectToDatabase } from '../../../../util/mongodb'
import withSession from '../../../../lib/withSession'
import * as Responses from '../../../../lib/helpers/responses'
import { ObjectId } from 'mongodb'
import getAppState from '../../../../lib/helpers/getAppState'

export default withSession(async (req, res) => {
	const {
		query: { recipientId },
		body: { subject, body },
	} = req

	// get the current user
	const sessionUser = req.session.get('user')
	// check the session, if no session, return forbidden

	if (!sessionUser) return Responses.forbidden(res)

	if (!recipientId || !body)
		return Responses.serverError(
			res,
			'Malformed request, must have recipient and body'
		)

	try {
		const { db } = await connectToDatabase()
		const messagesCollection = db.collection('messages')
		const usersCollection = db.collection('users')

		const message = {
			sender: sessionUser._id,
			recipient: recipientId,
			body: body.substring(0, 400), // limit message size to 400 characters, truncate anything over
			subject: subject.substring(0, 25), // limit subject size to 25 characters, truncate anything over
			sentAt: Date.now(),
			hasBeenRead: false,
			inResponseTo: null, // possibly chain messages into conversations in future
		}

		const insertMsgResponse = await messagesCollection.insertOne(message)
		const messageId = insertMsgResponse.insertedId

		if (insertMsgResponse.result.ok === 1) {
			const updateSenderResponse = await usersCollection.updateOne(
				{ _id: ObjectId(sessionUser._id) },
				{ $push: { sentMessages: messageId } }
			)
			console.log(sessionUser._id, recipientId)
			const updateRecipientResponse = await usersCollection.updateOne(
				{ _id: ObjectId(recipientId) },
				{ $push: { receivedMessages: messageId } }
			)

			const updatedUser = await getAppState(sessionUser._id)

			if (updateSenderResponse.result.ok === 1 && updateRecipientResponse.result.ok === 1) {
				
				return Responses.ok(res, 'Message sent!', { ...updatedUser })
			}

			return Responses.serverError(res, 'Message may not have been sent', {
				...updatedUser,
			})
		}
	} catch (error) {
		// todo logging
		console.log(`CAUGHT ERROR - /sendMessage : ${error}`)
		Responses.serverError(res, 'Could not send message')
	}
})
