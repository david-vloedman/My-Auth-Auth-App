import { connectToDatabase } from '../../util/mongodb'
import { ObjectId } from 'mongodb'
import { getUnreadMessages } from 'util/helpers/user'

export default async (uid) => {
// 	try {
// 		const { db } = await connectToDatabase()
// 		const usersCollection = db.collection('users')

// 		const currentUser = {
// 			...(await usersCollection.findOne(ObjectId(uid))),
// 			password: undefined,
// 		}
		
// 		const friendObjectIds = currentUser?.friends?.map((fri) => ObjectId(fri))

// 		const friends = friendObjectIds
// 			? await usersCollection
// 					.find({ _id: { $in: [...friendObjectIds] } })
// 					.project({ _id: 1, userName: 1, name: 1 })
// 					.toArray()
// 			: []

// 		const conversations = await db
// 			.collection('conversations')
// 			.find({ participants: `${currentUser._id}` })
// 			.toArray()

// 		const unreadMessages = await getUnreadMessages(db, uid)

// 		return {
// 			...currentUser,
// 			friends: friends ? [...friends] : [],
// 			conversations: conversations,
// 			newMessageCount: unreadMessages.length,
// 		}
// 	} catch (error) {
// 		console.error(error)
// 	}
// }
}