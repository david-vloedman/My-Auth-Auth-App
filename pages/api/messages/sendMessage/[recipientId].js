import { connectToDatabase } from '../../../../util/mongodb'
import withSession from '../../../../lib/withSession'
import * as Responses from '../../../../lib/helpers/responses'
import { ObjectId } from 'mongodb'
import getAppState from '../../../../lib/helpers/getAppState'

export default withSession(async (req, res) => {
	const {
		query: { recipientId},
		body: { subject, body }
	} = req
	
	// get the current user
	const sessionUser = req.session.get('user')
	// check the session, if no session, return forbidden

	if (!sessionUser) return Responses.forbidden(res)

	if(!recipientId || !body ) return Responses.serverError(res, 'Malformed request, must have recipient and body')

	try {
		const { db } = await connectToDatabase()
		const usersCollection = db.collection('users')
		const messagesCollection = db.collection('messages')

		const sender = await usersCollection.findOne(ObjectId(sessionUser._id))
    const recipient = await usersCollection.findOne(ObjectId(recipientId))
	

		const message = {
			sender: sessionUser._id,
			recipient: recipientId,
			message: body.substring(0, 400), // limit message size to 400 characters, truncate anything over
			subject: subject.substring(0, 25), // limit subject size to 25 characters, truncate anything over
			createdAt: Date.now(),
			inResponseTo: null // possibly chain messages into conversations in future
		}

		const insertResult = await messagesCollection.insertOne(message)

		console.log(insertResult)

		return res.json({...insertResult})

	} catch (error) {
		// todo logging
		console.log(`CAUGHT ERROR - /sendMessage : ${error}`)
		Responses.serverError(res, 'Could not send message')
	}
})
