import { connectToDatabase } from '../../../../util/mongodb'
import withSession from '../../../../lib/withSession'
import * as Responses from '../../../../lib/helpers/responses'
import { ObjectId } from 'mongodb'

export default withSession(async (req, res) => {
	const {
		query: { uid },
	} = req

	// get the current user
	const sessionUser = req.session.get('user')
	// check the session, if no session, return forbidden

	if (!sessionUser) return Responses.forbidden(res)
	// check if session user is already, if true, return

	if (sessionUser.friends?.find((fri) => fri._id !== uid))
		return Responses.ok(res, 'No friend found')

	try {
		const { db } = await connectToDatabase()
		const usersCollection = db.collection('users')
		// try to find user specified by given UID
		const friend = await usersCollection.findOne(ObjectId(uid))
		// no friend exists, return error
		if (!friend) return Responses.serverError(res, 'Failed to remove friend')
		// try to remove friend current user
		const user = await usersCollection.findOne(ObjectId(sessionUser._id))
		console.log(user.friends)
		const updatedList = user?.friends?.filter((f) => f !== uid)
		console.log(updatedList[uid])
		const updateResult = await usersCollection.updateOne(user, {
			$set: { friends: [...updatedList] },
		})

		console.log(updateResult.result)
		// if document was updated, retrieve updated user doc and update the session

		updateResult.result.n === 0
			? Responses.serverError(res, 'Failed to remove friend')
			: Responses.ok(res, `${friend.userName} has been removed from your friends`)
	} catch (error) {
		// todo logging
		console.log(`CAUGHT ERROR - /removeFriend : ${error}`)
		Responses.serverError(res, 'Friend could not be removed')
	}
})
