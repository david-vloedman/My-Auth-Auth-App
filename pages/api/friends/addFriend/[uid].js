import { connectToDatabase } from '../../../../server_lib/mongodb'
import withSession from '../../../../client_lib/withSession'
import * as Responses from '../../../../client_lib/helpers/responses'
import { ObjectId } from 'mongodb'
import getAppState from '../../../../client_lib/helpers/getAppState'

export default withSession(async (req, res) => {
	const {
		query: { uid },
	} = req

	// get the current user
	const sessionUser = req.session.get('user')
	// check the session, if no session, return forbidden

	if (!sessionUser) return Responses.forbidden(res)

	try {
		const { db } = await connectToDatabase()
		const usersCollection = db.collection('users')

		const user = await usersCollection.findOne(ObjectId(sessionUser._id))

		// if the users friends already include the friend, respond accordingly
		if (user.friends?.some((fri) => fri == uid))
			return Responses.noContent(res, 'Already friends')

		// try to find user specified by given UID
		const results = await usersCollection
			.find(ObjectId(uid))
			?.project({
				userName: 1,
				_id: 1,
				name: 1,
			})
			?.toArray()

		const friend = results.pop()

		// no friend exists, return error
		if (!friend) return Responses.serverError(res, 'Failed to add friend')

		// try to add friend to current user
		const updateResult = await usersCollection.updateOne(
			{ _id: ObjectId(sessionUser._id) },
			{ $push: { friends: friend._id } }
		)
		// if document was updated, retrieve updated user doc and update the session
		if (updateResult.result.nModified === 1) {
			updateResult.result.nModified === 0
				? Responses.serverError(res, 'Failed to add friend')
				: Responses.ok(
						res,
						`${friend.userName} has been added to your friends`,
						{ ...friend }
				  )
		}
	} catch (error) {
		// todo logging
		console.log(`CAUGHT ERROR - /addFriend : ${error}`)
		Responses.serverError(res, 'Friend could not be added')
	}
})
