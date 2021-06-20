import { connectToDatabase } from 'server_lib/mongodb'
import withSession from 'client_lib/withSession'
import * as Responses from 'client_lib/helpers/responses'
import { getUnreadMessages } from 'server_lib/helpers/user/user'
import { ObjectId } from 'mongodb'

export default withSession(async (req, res) => {
	const sessionUser = req.session.get('user')

	if (!sessionUser) return Responses.forbidden(res)
	// get all conversations the user is a participant in
	try {
		const { db } = await connectToDatabase()
        
    const data = await getUnreadMessages(db, sessionUser._id)
    console.log(data)
    res.status(200).json(data)
		// const allConversations = db.collection('conversations')

		// const userConvos = await allConversations
		// 	.find({
		// 		participants: `${sessionUser._id}`,
		// 	})
		// 	.toArray()

		// const newMessageConvos = userConvos.filter(
		// 	(c) => c.messages?.some((m) => m.hasBeenRead === false) || false
		// )

		// // console.log(unreadMessages)

		// if (userConvos.length > 0) {
		// 	return res.status(200).json({
		// 		conversations: [...newMessageConvos],
		// 	})
		// }
	} catch (error) {
		console.error(error)
	}
	// look through conversation messages and return
	// conversations with messages marked with hasBeenRead equals false and the sentBy
	// is not the current user
})
