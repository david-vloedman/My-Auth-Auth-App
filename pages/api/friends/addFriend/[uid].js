import { connectToDatabase } from '../../../../util/mongodb'
import withSession from '../../../../lib/withSession'
import * as Responses from '../../../../lib/helpers/responses'

export default withSession(async (req, res) => {
	const {
		query: { uid },
	} = req

	const sessionUser = req.session.get('user')

	if (!sessionUser) return Responses.forbidden(res)

	const { db } = await connectToDatabase()
	const usersCollection = db.collection('users')

	const friend = await usersCollection.findOne({ _id: uid })

  if (!friend) return res.send('Not found') // todo: friend not found response
  
  const currentUser = await usersCollection.findOne({ _id: sessionUser._id })
  const updatedUser = {
    ...currentUser,
    friends: [
      ...currentUser.friends,
      {
        friend_id: friend._id,
        name: friend.name
      },

      
    ]
  }
  const response = await usersCollection.updateOne({_id:currentUser._id}, updatedUser)

  console.log(response)

  res.json({...response})
})
