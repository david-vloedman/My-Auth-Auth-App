import { connectToDatabase } from '../../../util/mongodb'
import withSession from '../../../lib/withSession'

export default withSession(async (req, res) => {
	const {
		query: { id },
	} = req

	const sessionUser = req.session.get('user')

	if (!sessionUser)
		return res.status(403).json({
			status: 'fail',
			message: 'Forbidden',
		})

	const { db } = await connectToDatabase()

	const users = db.collection('users')

	if (!id) {
		const allUsers = await users.find({}).toArray()

		res.json({
			count: allUsers.length,
			results: allUsers,
		})
	}

	const user = await users.findOne({ _id: id })

	if (!user) {
		// return no user found
		return res.status(404).json({
			status: 'fail',
			message: 'User not found',
		})
	}

	res.status(200).json({
		status: 'success',
		data: {
			count: 1,
			results: [{ ...user, password: undefined }],
		},
	})
})
