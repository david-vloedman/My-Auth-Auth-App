import { connectToDatabase } from '../../../../util/mongodb'
import withSession from '../../../../lib/withSession'
import * as Responses from '../../../../lib/helpers/responses'
import { ObjectId, DBRef } from 'mongodb'

export default withSession(async (req, res) => {
	const {
		query: { uid },
	} = req

	// get the current user
	const sessionUser = req.session.get('user')
	// check the session, if no session, return forbidden
	
	if (!sessionUser) return Responses.forbidden(res)
	// check if session user is already, if true, return
	console.log(sessionUser.friends)
	console.log('session user into add friend', sessionUser.friends.find(f => f._id === uid))
	if (sessionUser.friends?.find((fri) => fri._id === uid))
		return Responses.ok(res, 'Already friends')

	try {
		const { db } = await connectToDatabase()
		const usersCollection = db.collection('users')
		// try to find user specified by given UID
		const friend = await usersCollection.findOne(ObjectId(uid))
		// no friend exists, return error
		if (!friend) return Responses.serverError(res, 'Failed to add friend')
		// try to add friend to current user
		const updateResult = await usersCollection.updateOne(
			{ _id: ObjectId(sessionUser._id) },
			{ $push: { friends: ObjectId(friend._id) } }
		)
		// if document was updated, retrieve updated user doc and update the session
		if (updateResult.result.nModified === 1) {
			const currentUser = await usersCollection.findOne(
				ObjectId(sessionUser._id),
				{ password: 0 },
				undefined
			)
			// retrieve friends names and usernames
			const friends = await usersCollection
				.find({_id: { $in: [...currentUser.friends]}}, { 'name': 1, 'userName': 1 }, undefined)
				.toArray()

			req.session.unset('user')

			req.session.set('user', {
				...currentUser,
				friends: [...friends],
			})

			await req.session.save()

			updateResult.result.nModified === 0
				? Responses.serverError(res, 'Failed to add friend')
				: Responses.ok(res, `${friend.userName} has been added to your friends`)
		}
	} catch (error) {
		// todo logging
		console.log(`CAUGHT ERROR - /addFriend : ${error}`)
		Responses.serverError(res, 'Friend could not be added')
	}
})
