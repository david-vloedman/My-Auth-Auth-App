import FriendsList from '../../FriendsList/FriendsList'
import ConversationDrawer from 'components/ConversationDrawer/ConversationDrawer'
import { friendRemoved } from '../../../redux/reducers'
import Conversation from 'components/Conversation/Conversation'
import * as ConversationActions from 'redux/conversation'

import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import { onConversationClose } from 'lib/helpers/conversation'
export default function FriendsContainer(props) {
	const reduxUser = useSelector((state) => state.user)

	const conversationState = useSelector((state) => state.conversation)

	const dispatch = useDispatch()

	const createConversation = async () => {
		try {
			const response = await axios.post('/api/messages/conversation/create', {
				recipientId: conversationState.recipient.recipientId,
				messageBody: conversationState.messageField,
			})

			console.log(response)
		} catch (error) {
			console.error(error)
		}
	}

	const dispatchFriendRemoved = (uid) => {
		dispatch(friendRemoved(uid))
	}

	return (
		<Box>
			<Paper>
				<Box display={'flex'} flexDirection={'column'} p={'1rem'}>
					<Typography component={'h2'} variant={'h5'}>
						Friends
					</Typography>

					<FriendsList
						friendsList={reduxUser.friends ? [...reduxUser.friends] : []}
						onRemoveFriend={dispatchFriendRemoved}
					/>
				</Box>
			</Paper>
			<ConversationDrawer>
				<Conversation />
			</ConversationDrawer>
		</Box>
	)
}
