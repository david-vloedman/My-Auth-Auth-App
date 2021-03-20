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

		console.log(receivedMessageResults)

		// add a property called 'id' and set the mongo ObjectId, _id to it for MUI Data-grid
		const receivedWithNames = await getSenderUserNames(
			usersCollection,
			receivedMessageResults
		)
		console.log(receivedWithNames, 'RC /w names')
		const sentWithNames = await getRecipientUserNames(
			usersCollection,
			sentMessageResults
		)
		console.log(sentWithNames)
		// turn id strings into 'objectId'... ehhh
		const friendObjectIds = currentUser?.friends?.map((fri) => ObjectId(fri))

		const friends = friendObjectIds
			? await usersCollection
					.find({ _id: { $in: [...friendObjectIds] } })
					.project({ _id: 1, userName: 1, name: 1 })
					.toArray()
			: []

		return {
			...currentUser,
			friends: friends ? [...friends] : [],
			receivedMessages: receivedWithNames ? [...receivedWithNames] : [],
			sentMessages: sentWithNames ? [...sentWithNames] : [],
		}
	} catch (error) {
		console.log(error)
	}
}

const getSenderUserNames = async (usersCollection, messageDocs) => {
	console.log(messageDocs)
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
		console.log(error)
	}
}
