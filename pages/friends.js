import Head from 'next/head'
import FriendsList from '../components/FriendsList/FriendsList'
import ComposeMessageDialog from '../components/dialogs/ComposeMessageDialog/ComposeMessageDialog'
import withSession from '../lib/withSession'
import getAppState from '../lib/helpers/getAppState'
import { useSelector, useDispatch } from 'react-redux'
import { friendRemoved } from '../redux/reducers'

import {
	composeMessageDialogOpen,
	composeMessageDialogClosed,
	messageFormChange,
	messageFormSubmit,
	sendRequestSuccess,
	sendRequestFail,
} from '../redux/composeMessageDialog'
import axios from 'axios'

const sendMessageUrl = '/api/messages/sendMessage/'

export default function friends(props) {
	const reduxUser = useSelector((state) => state.user)
	const composeMessageDialog = useSelector((state) => state.composeMessageDialog)
	const dispatch = useDispatch()

	const dispatchCloseDialog = () => {
		dispatch(composeMessageDialogClosed())
	}

	const dispatchOpenDialog = (recipientId, recipientUserName) => {
		dispatch(
			composeMessageDialogOpen({
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
		dispatch(messageFormChange(prop))
	}
	const dispatchMessageSubmit = async (e) => {
		
		try {
			const response = await axios.post(
				`${sendMessageUrl}${composeMessageDialog.messageForm.recipient}`,
				{
					...composeMessageDialog.messageForm,
				}
			)
			if (response.status === 200) {
				dispatch(sendRequestSuccess(response.data.data.message))
			}
		} catch (error) {
			console.log(error)
			dispatch(sendRequestFail())
		}
		dispatch(messageFormSubmit())
	}

	const dispatchFriendRemoved = (uid) => {
		dispatch(friendRemoved(uid))
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
						dialogOpen={composeMessageDialog.isOpen}
						closeDialog={dispatchCloseDialog}
						onSubmit={dispatchMessageSubmit}
						onChange={dispatchMessageChange}
						formData={composeMessageDialog.messageForm}
						recipientUsername={composeMessageDialog.messageForm.recipientDisplay}
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
