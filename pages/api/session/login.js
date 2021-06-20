import { connectToDatabase } from '../../../server_lib/mongodb'
import withSession from '../../../client_lib/withSession'
import bcrypt from 'bcrypt'
import { getUserState } from 'server_lib/helpers/user/user'
/**
 * Login into a user account
 */
export default withSession(async (req, res) => {
	const { db } = await connectToDatabase()
	
	const { userName, password } = req.body
	const userCollection = db.collection('users')

	const user = await userCollection.findOne({ userName: userName })

	if (!user) {
		return res.json({
			hasError: true,
			errorSource: 'userName',
			errorMsg: 'No user found',
		})
	}

	try {
		if (await bcrypt.compare(password, user.password)) {
			const newSession = {
				_id: user._id,
			}

			req.session.set('user', newSession)

			await req.session.save()

			const userState = await getUserState(user._id)

			return res.json({
				loggedIn: true,
				session: req.session.get('user'),
				user: userState,
			})

		}
	} catch (error) {
		res.json({
			hasError: true,
			errorSource: 'unknown',
			errorMsg: 'An unexpected error has occurred',
		})
	}

	return res.json({
		hasError: true,
		errorSource: 'password',
		errorMsg: 'Invalid password',
	})
})
