import { Box } from '@material-ui/core'
import { useState } from 'react'
import ConversationDisplay from '../ConversationDisplay/ConversationDisplay'
import ConversationHeading from '../ConversationHeading/ConversationHeading'
import SendMessageBox from '../input/SendMessageBox/SendMessageBox'

export default function Conversation(props) {
	const {
		conversation,
		isNewMessage,
		potentialRecipients,
		onSendMessage,
	} = props

	const [newMessageForm, setNewMessageForm] = useState({})

	const onSendToChange = (e, newValue) => {
		setNewMessageForm({
			...newMessageForm,
			recipientId: newValue._id
		})
	}

	const onMessageChange = (e) => {
		setNewMessageForm({
			...newMessageForm,
			messageBody: e.target.value
		})
	}

	const onSendMessageClick = (e) => {
		onSendMessage(newMessageForm)
	}

	return (
		<Box>
			<ConversationHeading
				isNewMessage={isNewMessage}
				potentialRecipients={potentialRecipients}
				onSendToChange={onSendToChange}
			/>
			<ConversationDisplay conversation={conversation}/>
			<SendMessageBox onMessageChange={onMessageChange} onSendMessage={onSendMessageClick}/>
		</Box>
	)
}
