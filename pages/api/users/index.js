import { connectToDatabase } from '../../../util/mongodb'
import withSession from '../../../lib/withSession'

export default withSession(async (req, res) => {
	const user = req.session.get('user')

	if (!user)
		return res.status(403).json({
			message: 'Not authorized',
		})

	const { db } = await connectToDatabase()

	const users = db.collection('users')

	const allUsers = await users.find({})?.toArray()

	if (!allUsers) {
		return res.status(404).json({
			count: 0,
			results: [],
		})
	}

	const usersMapped = allUsers.map((user) => ({
		...user,
		password: undefined,
	}))

	res.json({
		count: usersMapped.length,
		results: usersMapped,
	})
})
