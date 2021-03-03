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
		const friends = await userCollection
			.find(...user.friends)
			.project({ name: 1, userName: 1 })
			.toArray()

		console.log(friends, 'FRIENDS')

		req.session.set('user', {
			...user,
			password: undefined,
			friends: [...friends],
		})

		await req.session.save()

		return res.json({ loggedIn: true, session: req.session.get('user') })
	}

	return res.json({ hasError: true, errorMsg: 'Invalid password' })
})
