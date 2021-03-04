import { connectToDatabase } from '../../../util/mongodb'
import withSession from '../../../lib/withSession'
import * as Responses from '../../../lib/helpers/responses'
/**
 * Login into a user account
 */
export default withSession(async (req, res) => {
	const { searchValue } = JSON.parse(req.body)

	// get the current user
	const sessionUser = req.session.get('user')
	// check the session, if no session, return forbidden

	if (!sessionUser) return Responses.forbidden(res)
	// check if session user is already, if true, return

	try {
		const { db } = await connectToDatabase()

		const results = await db
			.collection('users')
			.find({
				$or: [{ userName: searchValue }, { name: searchValue }],
			})
			.project({ userName: 1, name: 1 })
			.toArray()

		Responses.ok(res, '', {
			count: results.length,
			results:[...results],
		})
	} catch (error) {
		console.log(error)
		Responses.serverError(res, 'Unable to search at this time')
	}
})
