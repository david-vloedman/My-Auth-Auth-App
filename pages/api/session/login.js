import { connectToDatabase } from '../../../util/mongodb'
import withSession from '../../../lib/withSession'
import bcrypt from 'bcrypt'
/**
 * Login into a user account
 */
export default withSession(async (req, res) => {
	const { db } = await connectToDatabase()
	const { userName, password } = JSON.parse(req.body)
	const userCollection = db.collection('users')
	const user = await userCollection.findOne({ userName: userName })
	
	console.log(user)

	if(!user){
		return res.json({loggedIn: false, error: 'No user found'})
	}

	if (await bcrypt.compare(password, user.password)) {
		req.session.set('user', {
			id: user._id,
			admin: false
		})

		await req.session.save()

		return res.json({loggedIn: true, session:req.session.get('user')})
	}

	return res.json({ loggedIn: false, error: 'Invalid password' })
})
