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
import { alert, onAlertClose } from '../../../redux/snackbar'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const sendMessageUrl = '/api/messages/sendMessage/'

export default function MessagesContainer(props) {
	const dispatch = useDispatch()
	const viewMessageDialogState = useSelector((state) => state.viewMessageDialog)
	const composeMessageDialogState = useSelector(
		(state) => state.composeMessageDialog
	)

	const userState = useSelector((state) => state.user)

	const dispatchViewDialogOpen = (params) => {
		const { row } = params
		const message = userState.receivedMessages.find((m) => m.id === row.id)
		dispatch(viewMessageDialogOpen(message))
	}

	/**
	 * View Message Dialog
	 */
	const dispatchViewDialogClose = () => dispatch(viewMessageDialogClosed())

	const dispatchDeleteMessages = (param) =>
		console.log('delete message: ', param)

	const dispatchMessageReply = (param) => {
		console.log(param)
		dispatchViewDialogClose()
		dispatchComposeDialogOpen({
			recipientId: param.sender,
			senderId: userState._id,
			recipientUserName: param.senderUser,
		})
	}

	/**
	 * Compose Message Dialog
	 */
	const dispatchComposeDialogClose = () =>
		dispatch(composeMessageDialogClosed())

	const dispatchComposeDialogOpen = (param) =>
		dispatch(composeMessageDialogOpen(param))

	/**
	 *
	 * Compose Message Form
	 */
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
			console.log(`${sendMessageUrl}${composeMessageDialogState.messageForm.recipient}`)
			const response = await axios.post(
				`${sendMessageUrl}${composeMessageDialogState.messageForm.recipient}`,
				{
					...composeMessageDialogState.messageForm,
				}
			)
			if (response.status === 200) {
				dispatch(sendRequestSuccess(response.data.data.message))
				return dispatch(
					alert({
						alertMessage: response.data.data.message,
						onClose: () => dispatch(onAlertClose()),
					})
				)
			}
		} catch (error) {
			console.log(error)
			dispatch(sendRequestFail())
		}
	}

	return (
		<Styles.StyledMainContainer>
			<Styles.StyledPaper>
				<Messages
					messages={userState.receivedMessages}
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
