import {
	messageAdded,
	setId,
	setRecipient,
	setMessages,
	chatOpen,
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
		const response = await axios.post('/api/conversations/send-message', {
			messageBody: messageField,
			conversationId,
		})

		console.log(response)

		if (response.status === 200) {
			return mapConversationToRedux(dispatch, response.data.data, state.recipient)
			
		}
	} catch (error) {
		console.error(error)
	}
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
	const alignedMessages = conversation.messages.map((msg) => ({
		...msg,
		align: msg.sentBy === recipientObj.id ? 'left' : 'right',
	}))

	dispatch(setMessages(alignedMessages))
}

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

	dispatch(setRecipient({ id: recipientId, userName: recipientUserName }))
	// if an existing conversation exists, map it to the conversation state
	if (existingChat) {
		mapConversationToRedux(dispatch, existingChat, {
			id: recipientId,
			userName: recipientUserName,
		})
	}
	dispatch(chatOpen())

	setInterval(async () => {
		console.log('update check')
		try {
			const response = await axios.get(
				`/api/conversations/messages/${existingChat._id}`
			)
			console.log(response)
			console.log(existingChat, 'existing chat')
			if (existingChat?.messages?.length < response?.data?.data?.length)
				dispatch(setMessages([...response?.data?.data]))
		} catch (error) {
			console.error(error)
		}
	}, 2000)
}
