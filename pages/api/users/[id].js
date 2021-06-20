import { connectToDatabase } from '../../../server_lib/mongodb'
import * as Responses from '../../../client_lib/helpers/responses'
import withSession from '../../../client_lib/withSession'

export default withSession(async (req, res) => {
	const {
		query: { id },
	} = req

	const sessionUser = req.session.get('user')

	if (!sessionUser) return Responses.forbidden(res)

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

	if (!user) return Responses.notFound(res, 'User not found')

	res.status(200).json({
		status: 'success',
		data: {
			count: 1,
			results: [{ ...user, password: undefined }],
		},
	})
})
