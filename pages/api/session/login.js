import { connectToDatabase } from '../../../util/mongodb'
import withSession from '../../../lib/withSession'
import bcrypt from 'bcrypt'
/**
 * Login into a user account
 */
export default withSession(async (req, res) => {
	const { db } = await connectToDatabase()
	const { userName, password } = JSON.parse(req.body)
	const userCollection = db.collection('users')
	const user = await userCollection.findOne({ userName: userName })

	if (!user) {
		return res.json({ loggedIn: false, error: 'No user found' })
	}

	if (await bcrypt.compare(password, user.password)) {
		const newSession = {
			...user,
			friends: await getFriends(user, userCollection),
			password: undefined
		}
		console.log(newSession)
		req.session.set('user', newSession)

		await req.session.save()

		return res.json({ loggedIn: true, session: req.session.get('user') })
	}

	return res.json({ hasError: true, errorMsg: 'Invalid password' })
})

/**
 * Gets the friends of the given 
 * @param {*} user 
 * @param {*} userCollection 
 * @param {*} req 
 */
export const getFriends = async (user, userCollection) => {
	if (user.friends) {
		const friends = await userCollection
			.find({_id: {$in: [...user.friends]}}, {userName: 1, name: 1}, undefined)
			.toArray()
		return [...friends]
	}

	return []
}

