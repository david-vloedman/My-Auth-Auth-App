import { connectToDatabase } from '../../../../util/mongodb'
import withSession from '../../../../lib/withSession'
import * as Responses from '../../../../lib/helpers/responses'
import { ObjectId } from 'mongodb'

export default withSession(async (req, res) => {
	const {
		query: { uid },
	} = req
	console.log(uid)
	const sessionUser = req.session.get('user')

	if (!sessionUser) return Responses.forbidden(res)

	const { db } = await connectToDatabase()
	const usersCollection = db.collection('users')

	const friend = await usersCollection.findOne(ObjectId(uid))
	console.log(friend)
	if (!friend) return res.send('Not found') // todo: friend not found response

	const currentUser = await usersCollection.findOne(ObjectId(sessionUser._id))

	const response = await usersCollection.updateOne(
		{_id:currentUser._id},
		{ $push: { friends: { friend_id: friend._id }}}
	)

	console.log(response)

	res.json({ ...response })
})
