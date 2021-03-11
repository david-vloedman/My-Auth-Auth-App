import Head from 'next/head'
import FriendsList from '../components/FriendsList/FriendsList'
import withSession from '../lib/withSession'
import getAppState from '../lib/helpers/getAppState'
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from '../redux/reducers'

export default function friends(props) {
	const reduxUser = useSelector((state) => state.user)
	console.log(reduxUser)
	const dispatch = useDispatch()

	const onRemoveFriend = (uid) => {
		dispatch(Actions.friendRemoved(uid))
	}

	return (
		<div className='container'>
			<Head>
				<title>My Friends</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<FriendsList
					friendsList={reduxUser.friends ? [...reduxUser.friends] : []}
					onRemoveFriend={onRemoveFriend}
				/>
			</main>

			<footer></footer>
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
