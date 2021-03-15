import Head from 'next/head'
import FriendsList from '../components/FriendsList/FriendsList'
import ComposeMessageDialog from '../components/dialogs/ComposeMessageDialog'
import withSession from '../lib/withSession'
import getAppState from '../lib/helpers/getAppState'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import * as Actions from '../redux/reducers'
import {
	closeDialog,
	openNewMessageDialog,
	onMessageFormChange,
	onMessageFormSubmit
} from '../redux/friendsPageSlice'

export default function friends(props) {
	const reduxUser = useSelector((state) => state.user)
	const pageState = useSelector((state) => state.friendsPage)
	const dispatch = useDispatch()

	const dispatchCloseDialog = () => {
		dispatch(closeDialog())
	}

	const dispatchOpenDialog = (recipientId) => {
		dispatch(openNewMessageDialog({ recipientId, senderId: reduxUser._id }))
	}
	
	const dispatchMessageChange = (e) => {
		const prop = {
			[e.target.name]: e.target.value
		}
		dispatch(onMessageFormChange(prop))
	}
	const dispatchMessageSubmit = (e) => {
		e.preventDefault()
		dispatch(onMessageFormSubmit())
	}

	// friends list remove friend
	const dispatchFriendRemoved = (uid) => {
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
					onRemoveFriend={dispatchFriendRemoved}
					openNewMessageDialog={dispatchOpenDialog}
				/>
				<ComposeMessageDialog
					dialogOpen={pageState.dialogOpen}
					closeDialog={dispatchCloseDialog}
					onSubmit={dispatchMessageSubmit}
					onChange={dispatchMessageChange}
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
