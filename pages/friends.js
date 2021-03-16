import Head from 'next/head'
import FriendsList from '../components/FriendsList/FriendsList'
import ComposeMessageDialog from '../components/dialogs/composeMessage/ComposeMessageDialog'
import withSession from '../lib/withSession'
import getAppState from '../lib/helpers/getAppState'
import { useSelector, useDispatch } from 'react-redux'
import { friendRemoved } from '../redux/reducers'
import {
	closeDialog,
	openNewMessageDialog,
	onMessageFormChange,
	onMessageFormSubmit,
	onMessageSent,
} from '../redux/friendsPageSlice'
import axios from 'axios'

export default function friends(props) {
	const reduxUser = useSelector((state) => state.user)
	const pageState = useSelector((state) => state.friendsPage)
	const dispatch = useDispatch()

	const dispatchCloseDialog = () => {
		dispatch(closeDialog())
	}

	const dispatchOpenDialog = (recipientId, recipientUserName) => {
		dispatch(
			openNewMessageDialog({
				recipientId,
				senderId: reduxUser._id,
				recipientUserName,
			})
		)
	}

	const dispatchMessageChange = (e) => {
		const prop = {
			[e.target.name]: e.target.value,
		}
		dispatch(onMessageFormChange(prop))
	}
	const dispatchMessageSubmit = (e) => {
		e.preventDefault()
		sendMessage()
		dispatch(onMessageFormSubmit())
	}

	const dispatchFriendRemoved = (uid) => {
		dispatch(friendRemoved(uid))
	}

	const dispatchOnMessageSent = () => {
		dispatch(onMessageSent)
	}

	const sendMessage = async () => {
		try {
			const response = await axios.post(
				`/api/messages/sendMessage/${pageState.messageForm?.recipient}`,
				{
					...pageState.messageForm,
				}
			)
			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='container'>
			<Head>
				<title>My Friends</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<div>
					<FriendsList
						friendsList={reduxUser.friends ? [...reduxUser.friends] : []}
						onRemoveFriend={dispatchFriendRemoved}
						openNewMessageDialog={dispatchOpenDialog}
					/>
					<ComposeMessageDialog
						dialogOpen={pageState.dialogOpen}
						closeDialog={dispatchCloseDialog}
						onSubmit={dispatchMessageSubmit}
						onChange={dispatchMessageChange}
						recipientUsername={pageState?.messageForm?.recipientDisplay}
					/>
				</div>
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
