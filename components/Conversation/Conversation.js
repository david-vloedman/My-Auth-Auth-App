import { Box, Divider } from '@material-ui/core'
import { useState } from 'react'
import ConversationDisplay from 'components/ConversationDisplay/ConversationDisplay'
import ConversationHeading from 'components/ConversationHeading/ConversationHeading'
import SendMessageBox from 'components/input/SendMessageBox/SendMessageBox'

export default function Conversation(props) {
	const {
		conversation,
		onSendMessage,
		onNewConversation,
		currentUserId,
		onMessageChange
	} = props

	const isNewConversation = conversation.messages.length === 0

	const messagesWithAlignment = conversation.messages?.map?.(msg => {
		if(msg.sentBy === currentUserId)
		return {
			...msg,
			align: msg.sentBy === currentUserId ? 'right' : 'left'
		}
	})

	return (
		<Box p={'1rem'} pt={'0'}>
			<ConversationHeading recipientName={conversation.recipient.recipientUserName} />
			<ConversationDisplay messages={messagesWithAlignment} />
			<Divider />
			<Box mt={'1rem'}>
				<SendMessageBox
					onMessageChange={onMessageChange}
					onSendMessage={isNewConversation ? onNewConversation : onSendMessage}
				/>
			</Box>
		</Box>
	)
}
