import { connectToDatabase } from '../../../../util/mongodb'
import { ObjectId } from 'mongodb'
import withSession from '../../../../lib/withSession'
import * as Responses from '../../../../lib/helpers/responses'

export default withSession(async (req, res) => {
	const {
		query: { messageId },
	} = req

	const sessionUser = req.session.get('user')
	if (!sessionUser) return Responses.forbidden(res)

	try {
		const { db } = await connectToDatabase()

		const user = await db.collection('users').findOne(ObjectId(sessionUser._id))

		const removalResponse = await db
			.collection('users')
			.updateOne({_id: user._id}, {
				$pull: { receivedMessages: ObjectId(messageId) },
			})
		
		return Responses.ok(res, 'success')
	} catch (error) {
		console.log(error)
		return Responses.serverError(res, error)
	}
})
