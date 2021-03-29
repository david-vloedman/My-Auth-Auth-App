/**
 *
 *  SendMessage, LoadConversation, UpdateConversation, CreateConversation
 *
 *
 */
import * as Actions from 'redux/conversation'
import { conversationAdded } from 'redux/reducers'

import axios from 'axios'

export const sendMessage = (dispatch, conversation, requestPostNewMessage) => {}

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

const alignMessagesBySender = (messages, recipientId) => {
	return messages.map((msg) => ({
		...msg,
		align: msg.sentBy === recipientId ? 'left' : 'right',
	}))
}

const loadConversation = (dispatch, conversation, recipientId, recipientUserName) => {
	dispatch(
		Actions.setConversation({
			...conversation,
			messages: [...alignMessagesBySender(conversation.messages, recipientId)],
      recipient: {userName: recipientUserName, _id: recipientId}
		})
	)
}

export const startUpdateInterval = async (conversationId ,requestUpdate) => {

  const url = `/api/conversations/${conversationId}`

  try{
    const intervalId = setInterval(async () => {
      const response = await axios.get(url)
    })
  } catch(error){
    console.error(error)
  }
}

export const openConversation = async (
	dispatch,
	recipientId,
	recipientUserName,
	existingConversations,
	requestNewConversation
) => {
	try {
		// check for existing conversation within user state or create new conversation
		const conversation =
			existingConversations.find((c) => {
				c.participants.includes(recipientId)
			}) || (await requestNewConversation(recipientId))
		// load conversation into convo dialog
		loadConversation(dispatch, conversation, recipientId)
		dispatch(
			Actions.setRecipient({ userName: recipientUserName, _id: recipientId })
		)
	} catch (error) {
    console.error(error)
    dispatch(Actions.failedToLoad())
  }
}
