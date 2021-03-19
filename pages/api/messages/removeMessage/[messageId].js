import { connectToDatabase } from '../../../../util/mongodb'
import withSession from '../../../../lib/withSession'
import * as Responses from '../../../../lib/helpers/responses'

export default withSession(async (req, res) => {
	const {
		query: { messageId },
	} = req

  const sessionUser = req.session.get('user')
  if(!sessionUser) return Responses.forbidden(res)

	try {
		const { db } = await connectToDatabase()

    const messagesCollection = db.collection('messages')

    

		return Responses.ok(res, 'success')
	} catch (error) {
		return Responses.serverError(res, error)
	}
})
