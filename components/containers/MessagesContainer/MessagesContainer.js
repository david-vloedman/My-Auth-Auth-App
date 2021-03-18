import * as Styles from './MessagesContainer.styles'
import Messages from '../../Messages/Messages'
import ViewMessageDialog from '../../dialogs/ViewMessageDialog/ViewMessageDialog'
import { dialogOpen, dialogClose } from '../../../redux/messagesPageSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function MessagesContainer(props) {
	const dispatch = useDispatch()
	const pageState = useSelector((state) => state.messagesPage)
	const userState = useSelector((state) => state.user)

	const dispatchDialogOpen = (params) => {
		const { row } = params
		const message = userState.messages.find((m) => m.id === row.id)
		dispatch(dialogOpen(message))
	}

	const dispatchDialogClose = () => {
		dispatch(dialogClose())
	}

	const dispatchMessageDelete = (param) => {
		console.log('delete message: ', param)
	}

	const dispatchMessageReply = (param) => {
		console.log('reply to message:', param)
	}

	return (
		<Styles.StyledMainContainer>
			<Styles.StyledPaper>
				<Messages
					messages={userState.messages}
					onOpenMessage={dispatchDialogOpen}
				/>
				<ViewMessageDialog
					dialogOpen={pageState.dialog.dialogOpen}
					dialogClose={dispatchDialogClose}
					onDeleteClick={dispatchMessageDelete}
					onReplyClick={dispatchMessageReply}
					message={pageState.dialog.message}
				/>
			</Styles.StyledPaper>
		</Styles.StyledMainContainer>
	)
}
