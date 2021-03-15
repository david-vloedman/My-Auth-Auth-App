import Head from 'next/head'
import FriendsList from '../components/FriendsList/FriendsList'
import ComposeMessageDialog from '../components/dialogs/ComposeMessageDialog'
import withSession from '../lib/withSession'
import getAppState from '../lib/helpers/getAppState'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import * as Actions from '../redux/reducers'
import {closeDialog, openNewMessageDialog, onMessageFormChange } from '../redux/friendsPageSlice'

export default function friends(props) {
	const reduxUser = useSelector((state) => state.user)
	const pageState = useSelector((state) => state.friendsPage)
	const dispatch = useDispatch()
	
	const [messageForm, setMessageForm] = useState({
		sender: reduxUser._id,
	})

	const closeDialog = () => {
		dispatch(closeDialog())
	}

	const openDialog = (recipientId) => {
		dispatch(openNewMessageDialog({recipientId, senderId: reduxUser._id}))
	}

	// message form
	const onMessageChange = (e) => {
		setMessageForm({
			...messageForm,
			[e.target.name]: e.target.value,
		})
	}
	const onMessageSubmit = (e) => {
		e.preventDefault()
		console.log(messageForm)
	}

	// friends list remove friend
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
					openNewMessageDialog={openDialog}
				/>
					<ComposeMessageDialog
					dialogOpen={pageState.dialogOpen}
					closeDialog={closeDialog}
					onSubmit={onMessageSubmit}
					onChange={onMessageChange}
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
