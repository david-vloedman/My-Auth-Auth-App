import FriendsList from '../../FriendsList/FriendsList'
import { StyledPaper } from './FriendsContainer.styles'
import {
	composeMessageDialogOpen,
	composeMessageDialogClosed,
	messageFormChange,
	messageFormSubmit,
	sendRequestSuccess,
	sendRequestFail,
} from '../../../redux/composeMessageDialog'
import ComposeMessageDialog from '../../dialogs/ComposeMessageDialog/ComposeMessageDialog'
import axios from 'axios'
import { friendRemoved } from '../../../redux/reducers'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const sendMessageUrl = '/api/messages/sendMessage/'

export default function FriendsContainer(props) {
	const reduxUser = useSelector((state) => state.user)
	const composeMessageDialog = useSelector(
		(state) => state.composeMessageDialog
	)
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
		<Box>
			<StyledPaper>
				<Box display={'flex'} flexDirection={'column'} p={'1rem'}>
					<Typography component={'h2'} variant={'h5'}>Friends</Typography>

					<FriendsList
						friendsList={reduxUser.friends ? [...reduxUser.friends] : []}
						onRemoveFriend={dispatchFriendRemoved}
						openNewMessageDialog={dispatchOpenDialog}
					/>
				</Box>
			</StyledPaper>
			<ComposeMessageDialog
				dialogOpen={composeMessageDialog.isOpen}
				dialogClosed={dispatchCloseDialog}
				onSubmit={dispatchMessageSubmit}
				onChange={dispatchMessageChange}
				formData={composeMessageDialog.messageForm}
				recipientUsername={composeMessageDialog.messageForm.recipientDisplay}
			/>
		</Box>
	)
}
