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

		const { receivedMessages, sentMessages } = currentUser

		const sentMessageResults = sentMessages
			? await messagesCollection
					.find({
						_id: { $in: [...sentMessages] },
					})
					?.toArray?.()
			: []

		const receivedMessageResults = receivedMessages
			? await messagesCollection
					.find({
						_id: { $in: [...receivedMessages] },
					})
					?.toArray?.()
			: []

		// add a property called 'id' and set the mongo ObjectId, _id to it for MUI Data-grid
		const receivedWithNames = await getSenderUserNames(
			usersCollection,
			receivedMessageResults
		)

		const sentWithNames = await getRecipientUserNames(
			usersCollection,
			sentMessageResults
		)

		// turn id strings into 'objectId'... ehhh
		const friendObjectIds = currentUser?.friends?.map((fri) => ObjectId(fri))

		const friends = friendObjectIds
			? await usersCollection
					.find({ _id: { $in: [...friendObjectIds] } })
					.project({ _id: 1, userName: 1, name: 1 })
					.toArray()
			: []

			const conversations = await db.collection('conversations').find({}).toArray()

		return {
			...currentUser,
			friends: friends ? [...friends] : [],
			receivedMessages: receivedWithNames ? [...receivedWithNames] : [],
			sentMessages: sentWithNames ? [...sentWithNames] : [],
			conversations: conversations
		}
	} catch (error) {
		console.error(error)
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
		console.error(error)
	}
}

const getRecipientUserNames = async (usersCollection, messageDocs) => {
	try {
		return await Promise.all(
			messageDocs.map(async (msg) => {
				const senderDoc = await usersCollection.findOne(ObjectId(msg.recipient))

				return {
					...msg,
					id: msg._id,
					senderUser: senderDoc.userName,
					_id: undefined,
				}
			})
		)
	} catch (error) {
		console.error(error)
	}
}


