import * as Actions from 'redux/conversation'
import { conversationAdded } from 'redux/reducers'
import axios from 'axios'

/**
 *
 * @param {*} dispatch
 * @param {*} conversationId
 * @param {*} requestPostNewMessage
 * @param {*} message
 */
export const sendMessage = async (
	dispatch,
	conversation,
	requestPostNewMessage
) => {
	// dispatch message is sending...
	try {
		console.log(conversation)
		const updatedConversation = await requestPostNewMessage(
			conversation._id,
			conversation.messageField
		)
		// dispatch message sent
		if (updatedConversation) {
			loadConversation(
				dispatch,
				updatedConversation,
				conversation.recipient._id,
				conversation.recipient.userName
			)

			return dispatch(Actions.messageSent())
		}

		dispatch(Actions.failedToSendMessage())
	} catch (error) {
		console.error(error)
	}
}

/**
 *
 * @param {*} dispatch
 * @param {*} recipientId
 * @param {*} requestNewConversation
 */
export const createConversation = async (
	dispatch,
	recipientId,
	requestNewConversation
) => {
	// dispatch isPending
	try {
		const newConversation = await requestNewConversation(recipientId)

		// dispatch isPending false
		if (newConversation) {
			dispatch(conversationAdded(newConversation))
		}

		// if failed, figure out what to do
	} catch (error) {}
}

/**
 *
 * @param {*} recipientId
 */
export const requestNewConversation = async (recipientId) => {
	const url = `/api/conversations/create/${recipientId}`

	try {
		const response = await axios.post(url)

		if (response.status === 200) {
			return response.data
		}

		return false
	} catch (error) {
		console.error(error)
		return false
	}
}
/**
 *
 * @param {*} conversationId
 * @param {*} message
 */
export const requestSendMessage = async (conversationId, message) => {
	const url = `/api/conversations/addMessage/${conversationId}/${message}`
	try {
		const response = await axios.post(url)
		if (response.status === 200) {
			return response.data.data
		}
		return false
	} catch (error) {
		console.error(error)
		return false
	}
}
/**
 *
 * @param {*} messages
 * @param {*} recipientId
 */
const alignMessagesBySender = (messages, recipientId) => {
	return messages?.map?.((msg) => ({
		...msg,
		align: msg.sentBy === recipientId ? 'left' : 'right',
	}))
}

export const markMessagesAsRead = async (conversationId) => {
	const url = `/api/conversations/messagesRead/${conversationId}`
	const response = await axios.post(url)

	console.log(response)
}

/**
 *
 * @param {*} dispatch
 * @param {*} conversation
 * @param {*} recipientId
 * @param {*} recipientUserName
 */
const loadConversation = (
	dispatch,
	conversation,
	recipientId,
	recipientUserName
) => {
	dispatch(
		Actions.setConversation({
			_id: conversation._id,
			messages: alignMessagesBySender(conversation.messages, recipientId),
			recipient: { userName: recipientUserName, _id: recipientId },
		})
	)

	if (conversation.messages?.some((msg) => !msg.hasBeenRead && msg.sentBy !== recipientId))
		markMessagesAsRead(conversation._id)
}

/**
 *
 * @param {*} conversationId
 */
const requestConversation = async (conversationId) => {
	const url = `/api/conversations/${conversationId}`
	try {
		const response = await axios.get(url)

		if (response.status === 200) {
			return response.data
		}

		return false
	} catch (error) {
		console.error(error)
		return false
	}
}

/**
 *
 * @param {*} dispatch
 * @param {*} conversationId
 * @param {*} requestUpdate
 * @param {*} setUpdates
 */
export const startUpdateInterval = async (
	dispatch,
	conversationId,
	requestUpdate,
	recipientId,
	recipientUserName
) => {
	try {
		const intervalId = setInterval(async () => {
			const response = await requestUpdate(conversationId)

			if (response)
				loadConversation(dispatch, response, recipientId, recipientUserName)
		}, 2000)
		dispatch(Actions.updateLoopStarted(intervalId))
	} catch (error) {
		clearInterval(intervalId)
		console.error(error)
	}
}

/**
 *
 * @param {*} dispatch
 * @param {*} intervalId
 */
export const endUpdateInterval = (dispatch, intervalId) => {
	clearInterval(intervalId)
	dispatch(Actions.updateLoopTerminated())
}

/**
 *
 * @param {*} dispatch
 * @param {*} recipientId
 * @param {*} recipientUserName
 * @param {*} existingConversations
 * @param {*} requestNewConversation
 */
export const openConversation = async (
	dispatch,
	recipientId,
	recipientUserName,
	existingConversations
) => {
	try {
		// check for existing conversation within user state or create new conversation
		const existingConversation = existingConversations.find((c) =>
			c.participants.includes(recipientId)
		)
		console.log(existingConversation)
		const conversation = existingConversation
			? await requestConversation(existingConversation._id)
			: await requestNewConversation(recipientId)
		// load conversation into redux
		loadConversation(dispatch, conversation, recipientId, recipientUserName)
		// start the update loop
		startUpdateInterval(
			dispatch,
			conversation._id,
			requestConversation,
			recipientId,
			recipientUserName
		)
		dispatch(Actions.chatOpen())
	} catch (error) {
		console.error(error)
		dispatch(Actions.failedToLoad())
	}
}

export const closeConversation = (dispatch, intervalId) => {
	// clear the interval
	endUpdateInterval(dispatch, intervalId)
	// close the dialog
	dispatch(Actions.chatClosed())
}
