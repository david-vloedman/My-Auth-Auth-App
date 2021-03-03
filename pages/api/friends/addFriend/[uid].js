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
	// no session, not allowed
	if (!sessionUser) return Responses.forbidden(res)

	const { db } = await connectToDatabase()
	const usersCollection = db.collection('users')

	const friend = await usersCollection.findOne(ObjectId(uid))

	if (!friend) return Responses.serverError(res, 'Failed to add friend')

	

	const updateResult = await usersCollection.updateOne(
		{ _id: ObjectId(sessionUser._id) },
		{ $push: { friends: ObjectId(friend._id)} }
	)

	if(updateResult.result.nModified === 1){
		const currentUser = await usersCollection.findOne(ObjectId(sessionUser._id))
		console.log(currentUser)
		req.session.unset('user')

		req.session.set('user', {
			...currentUser,
			password: undefined
		})

		await req.session.save()
	}

	updateResult.result.nModified === 0
		? Responses.serverError(res, 'Failed to add friend')
		: Responses.ok(res, `${friend.userName} has been added to your friends`)
})


 