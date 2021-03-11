import { connectToDatabase } from '../../util/mongodb'
import { ObjectId } from 'mongodb'

export default async (uid) => {
	try {
		const { db } = await connectToDatabase()
		const usersCollection = db.collection('users')

		const currentUser = await usersCollection.findOne(ObjectId(uid)) // figure out how to project using findOne

		currentUser.password = undefined // to prevent the password hash from making it to the client

    console.log(currentUser)
		// map friends into object ids due to deciding to store friends as string ids rather than objectIds
		const mappedFriends = currentUser?.friends?.map((fri) => ObjectId(fri))

		if (mappedFriends) {
			const friends = await usersCollection
				.find({ _id: { $in: [...mappedFriends] } })
				.project({ _id: 1, userName: 1, name: 1 })
				.toArray()

			return {
				  ...currentUser, friends: friends ? [...friends] : [] 
			}
		}

		return {
			...currentUser,
		}
	} catch (error) {
		console.log(error)
	}
}
