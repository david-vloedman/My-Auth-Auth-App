import { connectToDatabase } from '../../../../util/mongodb'
import withSession from '../../../../lib/withSession'
import * as Responses from '../../../../lib/helpers/responses'
import { ObjectId, DBRef } from 'mongodb'

export default withSession(async (req, res) => {
  const {
    query: { uid, subject, message },
    
	} = req
	// get the current user
	const sessionUser = req.session.get('user')
	// no session, not allowed
  if (!sessionUser) return Responses.forbidden(res)

  const { db } = await connectToDatabase()
  const usersCollection = db.collection('users')
  const messagesCollection = db.collection('messages')

	const recipient = await usersCollection.findOne(ObjectId(uid))

	if (!recipient) return Responses.notFound(res, 'Message failed: recipient not found')
  
  const newMessage = {
    recipient: DBRef('users', ObjectId(recipient._id)),
    sender: DBRef('users', ObjectId(sessionUser._id)),
    subject,
    message,
    read: false
  }

  const insertResponse = messagesCollection.insert(newMessage)

  console.log(insertResponse)
})