import { connectToDatabase } from 'util/mongodb'
import withSession from 'lib/withSession'
import * as Responses from 'lib/helpers/responses'
import { ObjectId } from 'mongodb'

export default withSession(async (req, res) => {
  const {params} = req.query

  if(!params || params.length !== 2){
    res.status(500).json({
      message: 'malformed request'
    })
  }
  const [conversationId, messageBody] = params

	const sessionUser = req.session.get('user')
	if (!sessionUser) return Responses.forbidden(res)

  try {
		const { db } = await connectToDatabase()
		const conversations = db.collection('conversations')

		const newMessage = {
			sentAt: new Date(),
			body: messageBody,
			sentBy: sessionUser._id,
		}

		const updateResult = await conversations.updateOne(
			{ _id: ObjectId(conversationId) },
			{ $push: { messages: newMessage } }
		)
    
    if(updateResult.result.n === 1){
      const updatedConversation = await conversations.findOne(ObjectId(conversationId))
      return Responses.ok(res, 'message sent', updatedConversation)
    }
    
    return Responses.serverError(res, 'message failed to send')
		
	} catch (error) {
		console.error(error)
		Responses.serverError(res, error)
	}
})
