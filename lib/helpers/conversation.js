import {
	messageSent,
	setId,
	setRecipient,
	setMessages,
	chatOpen,
	chatClosed
} from 'redux/conversation'
import axios from 'axios'

/**
 *
 * @param {*} dispatch
 * @param {*} messageField
 * @param {*} conversationId
 */
export const sendMessage = async (
	dispatch,
	messageField,
	conversationId,
	state
) => {
	try {
		dispatch(messageSent())
		const response = await axios.post('/api/conversations/send-message', {
			messageBody: messageField,
			conversationId,
		})

		if (response.status === 200) {

			return mapConversationToRedux(dispatch, response.data.data, state.recipient)
			
		}
	} catch (error) {
		console.error(error)
	}
}
export const onConversationClose = (dispatch, state) => {
	clearInterval(state.intervalId)
	dispatch(chatClosed())
}

/**
 *
 * @param {*} dispatch
 * @param {*} state
 */
export const onSendButtonClick = async (dispatch, state) => {
	// if the conversation state has an id, the conversation already exists in
	// the DB and should send a message rather than create a new conversation
	if (state._id) {
		return sendMessage(dispatch, state.messageField, state._id, state)
	}

	dispatch(
		setRecipient({
			id: state.recipient.id,
			userName: state.recipient.userName,
		})
	)

	try {
		const response = await axios.post('/api/conversations/create', {
			recipientId: state.recipient.id,
			messageBody: state.messageField,
		})
		if (response.status === 200) {
			dispatch(setId(response.data.data._id))
		}
		console.log(response)
	} catch (error) {
		// dispatch critical error
		console.error(error)
	}
}

/**
 *
 * @param {*} dispatch
 * @param {*} conversation
 * @param {userName, id} recipientObj
 */
export const mapConversationToRedux = (
	dispatch,
	conversation,
	recipientObj
) => {
	dispatch(setRecipient(recipientObj))
	dispatch(setId(conversation._id))
	// give the messages an align value based on the user that authored it
	const alignedMessages = alignMessagesBySender(conversation.messages, recipientObj)

	dispatch(setMessages(alignedMessages))
}

const alignMessagesBySender = (messages, recipientObj) =>  messages.map((msg) => ({
	...msg,
	align: msg.sentBy === recipientObj.id ? 'left' : 'right',
}))

/**
 *
 * @param {*} dispatch
 * @param {*} recipientId
 * @param {*} recipientUserName
 * @param {*} existingConversations
 */
export const onOpenChat = (
	dispatch,
	recipientId,
	recipientUserName,
	existingConversations
) => {
	// look for conversations in userState with the recipient provided
	const existingChat = existingConversations.find((c) =>
		c.participants.includes(recipientId)
	)
	console.log(recipientId)
	dispatch(setRecipient({ id: recipientId, userName: recipientUserName }))
	// if an existing conversation exists, map it to the conversation state
	if (existingChat) {
		mapConversationToRedux(dispatch, existingChat, {
			id: recipientId,
			userName: recipientUserName,
		})
	}

	const intervalId = setInterval(async () => {
		
		try {
			const response = await axios.get(
				`/api/conversations/messages/${existingChat._id}`
			)
			if (existingChat?.messages?.length < response?.data?.data?.length){
				const alignedMessages = alignMessagesBySender(response.data.data, { id: recipientId, userName: recipientUserName })
				dispatch(setMessages([...alignedMessages]))}
		} catch (error) {
			console.error(error)
		}
	}, 2000)

	dispatch(chatOpen(intervalId))


}
