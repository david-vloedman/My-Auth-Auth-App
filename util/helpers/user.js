export const getUserState = (db, uid) => {}



export const getUnreadMessages = async (db, uid) => {
	try {
		const conversations = await getUserConversations(db, uid)

		const data = conversations?.reduce((acc, con) => {
			const unreadMessages = con.messages?.filter(
				(msg) => !msg.hasBeenRead && msg.sentBy !== uid
			)

			if (unreadMessages?.length > 0) {
				acc.push({
					newCount: unreadMessages.length,
					...con,
				})
			}

			return acc
		}, [])

		return data
	
	} catch (error) {
		console.error(error)
	}
}

export const getUserConversations = async (db, uid) => {
	try {
		const data = await db
			.collection('conversations')
			.find({
				participants: `${uid}`,
			})
			?.toArray?.()

		return data
	} catch (error) {
		console.error(error)
	}
}
