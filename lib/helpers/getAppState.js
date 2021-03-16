import { connectToDatabase } from '../../util/mongodb'
import { ObjectId } from 'mongodb'

export default async (uid) => {
	try {
		const { db } = await connectToDatabase()
		const usersCollection = db.collection('users')
		const messagesCollection = db.collection('messages')

		const currentUser = {
			...(await usersCollection.findOne(ObjectId(uid))),
			password: undefined,
		}
		const messages = await messagesCollection.find({
			$or: [{ sender: uid }, { recipient: uid }],
		})?.toArray?.()

		// turn id strings into 'objectId'... ehhh
		const friendObjectIds = currentUser?.friends?.map((fri) => ObjectId(fri))

		if (friendObjectIds) {
			const friends = await usersCollection
				.find({ _id: { $in: [...friendObjectIds] } })
				.project({ _id: 1, userName: 1, name: 1 })
				.toArray()

			return {
				...currentUser,
				friends: friends ? [...friends] : [],
				messages: {...messages}
			}
		}

		return {
			...currentUser,
		}
	} catch (error) {
		console.log(error)
	}
}
