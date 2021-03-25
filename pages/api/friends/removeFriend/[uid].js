import { connectToDatabase } from '../../../../util/mongodb'
import withSession from '../../../../lib/withSession'
import * as Responses from '../../../../lib/helpers/responses'
import { ObjectId } from 'mongodb'
import getAppState from '../../../../lib/helpers/getAppState'

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
		const friend = await usersCollection.findOne(ObjectId(uid))
		// check to see if the current user is friends with the given UID, if not, nothing to remove
		if(!user.friends?.includes(uid)) return Responses.notFound(res, 'Friend not found')
		
		const updatedList = user?.friends?.filter((f) => f !== uid)
		
		const updateResult = await usersCollection.updateOne(user, {
			$set: { friends: [...updatedList] },
		})

				// if document was updated, retrieve updated user doc and update the session
		const updatedUser = await getAppState(user._id)
		
		updateResult.result.nModified === 0
			? Responses.serverError(res, 'Failed to remove friend')
			: Responses.ok(
				res,
				`${friend.userName} has been removed from your friends`,
				 {...updatedUser})

	} catch (error) {
		// todo logging
		console.log(`CAUGHT ERROR - /removeFriend : ${error}`)
		Responses.serverError(res, 'Friend could not be removed')
	}
})
