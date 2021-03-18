import * as Styles from './MessagesContainer.styles'
import Messages from '../../Messages/Messages'
import ViewMessageDialog from '../../dialogs/ViewMessageDialog/ViewMessageDialog'
import ComposeMessageDialog from '../../dialogs/ComposeMessageDialog/ComposeMessageDialog'
import SnackBar from '../../SnackBar/SnackBar'
import {
	viewMessageDialogOpen,
	viewMessageDialogClosed,
} from '../../../redux/viewMessageDialog'
import {
	composeMessageDialogOpen,
	composeMessageDialogClosed,
	messageFormChange,
	messageFormSubmit,
	sendRequestSuccess,
	sendRequestFail,
} from '../../../redux/composeMessageDialog'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

export default function MessagesContainer(props) {
	const dispatch = useDispatch()
	const viewMessageDialogState = useSelector((state) => state.viewMessageDialog)
	const composeMessageDialogState = useSelector(
		(state) => state.composeMessageDialog
	)

	const userState = useSelector((state) => state.user)

	const dispatchViewDialogOpen = (params) => {
		const { row } = params
		const message = userState.messages.find((m) => m.id === row.id)
		dispatch(viewMessageDialogOpen(message))
	}

	const dispatchViewDialogClose = () => dispatch(viewMessageDialogClosed())

	const dispatchDeleteMessages = (param) =>
		console.log('delete message: ', param)

	const dispatchComposeDialogClose = () =>
		dispatch(composeMessageDialogClosed())

	const dispatchComposeDialogOpen = (param) =>
		dispatch(composeMessageDialogOpen(param))

	const dispatchMessageReply = (param) => {
		// close the view message dialog
		dispatchViewDialogClose()
		dispatchComposeDialogOpen({
			recipientId: param.recipient,
			senderId: userState._id,
			recipientUserName: param.senderUser,
		})
	}

	const dispatchMessageFormChange = (e) => {
		dispatch(
			messageFormChange({
				[e.target.name]: e.target.value,
			})
		)
	}

	const dispatchMessageSent = async (param) => {
		dispatch(messageFormSubmit())
		try {
			const response = await axios.post(
				`/api/messages/sendMessage/${composeMessageDialogState.messageForm.recipient}`,
				{
					...composeMessageDialogState.messageForm,
				}
			)
			if (response.data?.insertedId) dispatch(sendRequestSuccess())
			dispatch(sendRequestFail())
		} catch (error) {
			dispatch(sendRequestFail())
		}
	}

	return (
		<Styles.StyledMainContainer>
			<Styles.StyledPaper>
				<Messages
					messages={userState.messages}
					onOpenMessage={dispatchViewDialogOpen}
					onDeleteMessage={dispatchDeleteMessages}
				/>
			</Styles.StyledPaper>
			<ComposeMessageDialog
				dialogOpen={composeMessageDialogState.isOpen}
				formData={composeMessageDialogState.messageForm}
				isLoading={composeMessageDialogState.loading}
				dialogClosed={dispatchComposeDialogClose}
				onSubmit={dispatchMessageSent}
				onChange={dispatchMessageFormChange}
			/>
			<ViewMessageDialog
				dialogOpen={viewMessageDialogState.isOpen}
				message={viewMessageDialogState.message}
				dialogClose={dispatchViewDialogClose}
				onDeleteClick={dispatchDeleteMessages}
				onReplyClick={dispatchMessageReply}
			/>
			<SnackBar />
		</Styles.StyledMainContainer>
	)
}
