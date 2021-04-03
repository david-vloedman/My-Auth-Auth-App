import { connectToDatabase } from 'util/mongodb'
import withSession from 'lib/withSession'
import * as Responses from 'lib/helpers/responses'
import { ObjectId } from 'mongodb'

export default withSession(async (req, res) => {
	const { conversationId } = req.query

	const sessionUser = req.session.get('user')

	// if(!params || params.length !== 2){
	//   res.status(500).json({
	//     message: 'malformed request'
	//   })
	// }

	if (!sessionUser) return res.status(403)

	try {
		const { db } = await connectToDatabase()

		const updateResult = await db
			.collection('conversations')
			.updateOne(
				{ _id: ObjectId(conversationId), 'messages.hasBeenRead': false, 'messages.sentBy': { $ne: `${sessionUser._id}`}},
				{ $set: { 'messages.$.hasBeenRead': true } },
				{ multi: true }
			)

		res.status(200).json(updateResult.nModified)
	} catch (error) {
		console.error(error)
		res.status(500)
	}
})
