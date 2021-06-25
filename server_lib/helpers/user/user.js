import { ObjectId } from 'bson'
import { connectToDatabase } from 'server_lib/mongodb'

/**
 * @param {*} db
 * @param {*} uid
 */
export const getUserState = async (uid) => {
	try {
		const { db } = await connectToDatabase()
		const user = await getUser(db, uid)
		const conversations = await getUserConversations(db, uid)
		const friends = await getUserFriends(user, db.collection('users'))
		const chessMatches = await getUserChessMatches(db, uid)
		console.log(chessMatches)
		return { ...user, friends, conversations, chessMatches }
	} catch (error) {
		console.error(error, new Error().stack)
	}
}

/**
 * Get the conversations for a given user
 * @param {*} db
 * @param {*} uid
 * @returns {
 * 	ObjectId,
 * 	participants,
 * 	messages,
 * }
 */
export const getUserConversations = async (db, uid) => {
	try {
		const conversations = await db
			.collection('conversations')
			.find({
				participants: `${uid}`,
			})
			?.toArray?.()

		const unreadConversations = getUnreadConversations(conversations, uid)

		const mappedConversations = conversations.map((con) =>
			unreadConversations.includes(con)
				? {
						...con,
						hasNewMessage: true,
				  }
				: con
		)

		return mappedConversations
	} catch (error) {
		console.error(error, new Error().stack)
		return []
	}
}

/**
 * returns the conversations that contain new messages for the given user id
 * This isn't great and it's my (David) fault. I tried to be stupid simple on
 * the way conversations are stored in the DB and now this function exists.
 * @param {*} conversations
 * @returns
 */
const getUnreadConversations = (conversations, uid) => {
	const data = conversations?.reduce((acc, con) => {
		const unreadMessages = con.messages?.filter(
			(msg) => !msg.hasBeenRead && msg.sentBy !== uid
		)

		if (unreadMessages?.length > 0) {
			acc.push(con)
		}

		return acc
	}, [])

	return data
}

/**
 * Retrieves the given user from the given db
 * @param {*} db
 * @param {*} uid
 */
const getUser = async (db, uid) => {
	try {
		const userDoc = await db
			.collection('users')
			.findOne({ _id: uid }, { projection: { password: 0 } })

		return userDoc
	} catch (error) {
		console.error(error, new Error().stack)
	}
}

/**
 * Gets the friends of the given user doc
 * @param {*} user
 * @param {*} userCollection
 * @param {*} req
 */
export const getUserFriends = async (user, userCollection) => {
	try {
		const friendObjIds = user?.friends.map((uid) => ObjectId(uid)) || []

		const friends = await userCollection
			.find(
				{ _id: { $in: friendObjIds } },
				{ projection: { userName: 1, name: 1 } }
			)
			.toArray()

		return friends
	} catch (error) {
		console.error(error)
		return []
	}
}

/**
 * Gets the matches attached to the current user
 * @param {*} db
 * @param {*} userId
 * @returns
 */
export const getUserChessMatches = async (db, userId) => {
	try {
		const userMatches = await db
			.collection('chessMatches')
			.find({
				$or: [
					{
						'players.white._id': ObjectId(userId),
					},
					{ 'players.black._id': ObjectId(userId) },
				],
			})
			.toArray()

		const mapped = userMatches.map((m) => ({
			...m,
			opponent:
				m.players.white._id === userId
					? m.players?.black?.userName
					: m.players?.white?.userName,
		}))

		return mapped
	} catch (error) {
		console.error(error)
	}
}
