import { connectToDatabase } from '../../../util/mongodb'
import withSession from '../../../lib/withSession'

export default withSession(async (req, res) => {
	const user = req.session.get('user')

	if (!user)
		return res.status(403).json({
			status: 'fail',
			message: 'Forbidden',
		})

	const { db } = await connectToDatabase()

	const users = db.collection('users')

	const allUsers = await users.find({})?.toArray()

	if (!allUsers) {
		return res.status(200).json({
			status: 'success',
			data: {
				count: 0,
				results: [],
			},
		})
	}

	const usersMapped = allUsers.map((user) => ({
		...user,
		password: undefined,
	}))

	res.status(200).json({
		status: 'success',
		data: {
			count: usersMapped.length,
			results: usersMapped,
		},
	})
})
