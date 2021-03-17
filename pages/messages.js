import Head from 'next/head'
import MessagesContainer from '../components/containers/MessagesContainer/MessagesContainer'
import ViewMessageDialog from '../components/dialogs/ViewMessageDialog/ViewMessageDialog'
import withSession from '../lib/withSession'
import getAppState from '../lib/helpers/getAppState'
import {dialogOpen, dialogClose} from '../redux/messagesPageSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function messages(props) {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	const pageState = useSelector((state) => state.messagesPage)
	
	const dispatchDialogOpen = (params) => {
		const {row} = params
		const message = user.messages.find(m => m.id === row.id)
		dispatch(dialogOpen(message))
	}

	const dispatchDialogClose = () => {
		dispatch(dialogClose())
	}

	console.log(user.messages)
	return (
		<div>
			<Head>
				<title>Messages</title>
			</Head>
			<MessagesContainer messages={user.messages} onMessageClick={dispatchDialogOpen}/>
			<ViewMessageDialog {...pageState.dialog} dialogClose={dispatchDialogClose}/>
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
