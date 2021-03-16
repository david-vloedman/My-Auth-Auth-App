import Head from 'next/head'
import MessagesContainer from '../components/containers/MessagesContainer/MessagesContainer'
import withSession from '../lib/withSession'
import getAppState from '../lib/helpers/getAppState'
import { useDispatch, useSelector } from 'react-redux'

export default function messages(props) {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	
	console.log(user.messages)
	return (
		<div>
			<Head>
				<title>Messages</title>
			</Head>
			<MessagesContainer messages={user.messages}/>
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
