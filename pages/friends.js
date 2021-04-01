import Head from 'next/head'
import withSession from '../lib/withSession'
import getAppState from '../lib/helpers/getAppState'

import FriendsContainer from '../components/containers/FriendsContainer/FriendsContainer'
import axios from 'axios'

export default function friends(props) {
const getUnreadMessages = async () => {
	const unreadMessages = await axios.get('/api/users/unreadMessages')

	console.log(unreadMessages)
}
	return (
		<div>
			<Head>
				<title>My Friends</title>
			</Head>
			<button onClick={getUnreadMessages}>Click</button>
			<FriendsContainer />
		</div>
	)
}

export const getServerSideProps = withSession(async function ({ req, res }) {
	const sessionUser = req.session.get('user')

	if (!sessionUser) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}

	try {
		const appState = await getAppState(sessionUser._id)

		const json = JSON.stringify(appState)
		const jsonParsed = JSON.parse(json)
		return {
			props: {
				...jsonParsed,
			},
		}
	} catch (error) {
		console.log(error)
		return {
			notFound: true,
		}
	}
})
