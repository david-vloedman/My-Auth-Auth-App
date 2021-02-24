import { connectToDatabase } from '../../../util/mongodb'
import { withIronSession} from 'next-iron-session'
import bcrypt from 'bcrypt'
/**
 * Login into a user account
 */
const handler = async (req, res) => {
	const { db } = await connectToDatabase()
	const { userName, password } = JSON.parse(req.body)
	const userCollection = db.collection('users')
	const user = await userCollection.findOne({ userName: userName })
	
	if(!user){
		return res.json({loggedIn: false, error: 'No user found'})
	}

	if (await bcrypt.compare(password, user.password)) {
		req.session.set('user', {
			id: user._id,
			admin: false
		})

		await req.session.save()

		return res.json({loggedIn: true})
	}

	return res.json({ loggedIn: false, error: 'Invalid password' })
}

export default withIronSession(handler, {
	password: process.env.TOKEN_SECRET,
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production'
	},
	cookieName: 'session'
})
