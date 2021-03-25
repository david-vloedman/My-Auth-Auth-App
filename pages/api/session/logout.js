import {withIronSession} from 'next-iron-session'

const handler = async (req, res) => {
	req.session.destroy()
  res.send('Logged out')
}

export default withIronSession(handler, {
	password: process.env.TOKEN_SECRET,
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production'
	},
	cookieName: 'session'
})