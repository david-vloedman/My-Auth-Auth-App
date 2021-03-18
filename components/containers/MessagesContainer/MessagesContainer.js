import * as Styles from './MessagesContainer.styles'
import Messages from '../../Messages/Messages'
import ViewMessageDialog from '../../dialogs/ViewMessageDialog/ViewMessageDialog'
import ComposeMessageDialog from '../../dialogs/ComposeMessageDialog/ComposeMessageDialog'
import {
	viewMessageDialogOpen,
	viewMessageDialogClosed,
} from '../../../redux/viewMessageDialog'
import {
	composeMessageDialogOpen,
	composeMessageDialogClosed,
} from '../../../redux/composeMessageDialog'
import { useDispatch, useSelector } from 'react-redux'

export default function MessagesContainer(props) {
	const dispatch = useDispatch()
	const viewMessageDialogState = useSelector((state) => state.viewMessageDialog)
	const composeMessageDialogState = useSelector(
		(state) => state.composeMessageDialog
	)

	console.log(composeMessageDialogState)
	console.log(viewMessageDialogState)
	const userState = useSelector((state) => state.user)

	const dispatchViewDialogOpen = (params) => {
		const { row } = params
		const message = userState.messages.find((m) => m.id === row.id)
		dispatch(viewMessageDialogOpen(message))
	}

	const dispatchViewDialogClose = () => {
		dispatch(viewMessageDialogClosed())
	}

	const dispatchDeleteMessages = (param) => {
		// retrieve the selection model
		console.log('delete message: ', param)
	}

	const dispatchComposeDialogClose = () => {
		dispatch(composeMessageDialogClosed())
	}

	const dispatchComposeDialogOpen = (param) => {
		dispatch(composeMessageDialogOpen(param))
	}

	const dispatchMessageReply = (param) => {
		// close the view message dialog
		dispatchViewDialogClose()
		dispatchComposeDialogOpen({
			recipientId: param.recipient,
			senderId: userState._id,
			recipientUserName: param.senderUser,
		})
		console.log('reply to message:', param)
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
					dialogClosed={dispatchComposeDialogClose}
				/>
			<ViewMessageDialog
				dialogOpen={viewMessageDialogState.isOpen}
				dialogClose={dispatchViewDialogClose}
				onDeleteClick={dispatchDeleteMessages}
				onReplyClick={dispatchMessageReply}
				message={viewMessageDialogState.message}
			/>
			
		</Styles.StyledMainContainer>
	)
}
