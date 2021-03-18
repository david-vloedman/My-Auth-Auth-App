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
		const results = await messagesCollection
			.find({
				recipient: currentUser._id.toString(),
			})
			?.toArray?.()

		// add a property called 'id' and set the mongo ObjectId, _id to it for MUI Data-grid
		const messages = await getSenderUserNames(usersCollection, results)

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
				messages,
			}
		}

		return {
			...currentUser,
		}
	} catch (error) {
		console.log(error)
	}
}

const getSenderUserNames = async (usersCollection, messageDocs) => {
	try {
		return await Promise.all(
			messageDocs.map(async (msg) => {
				const senderDoc = await usersCollection.findOne(ObjectId(msg.sender))

				return {
					...msg,
					id: msg._id,
					senderUser: senderDoc.userName,
					_id: undefined,
				}
			})
		)
	} catch (error) {
		console.log(error)
	}
}
