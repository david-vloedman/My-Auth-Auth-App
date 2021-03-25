import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const reducer = {
	setRecipient(state, action) {
		return {
			...state,
			recipient: {
				...action.payload,
			},
		}
	},
	setMessages(state, action) {
		return {
			...state,
			messages: [...action.payload],
		}
	},

	messageAdded(state, action) {
		return {
			...state,
			messages: [...state.messages, action.payload],
		}
	},

	chatOpen(state, action) {
		return {
			...state,
			isOpen: true,
		}
	},

	chatClosed(state, action) {
		return {
			recipient: {
				userName: '',
				_id: '',
			},
			messages: [],
			isOpen: false,
		}
	},

	messageFieldChange(state, action) {
		return {
			...state,
			messageField: action.payload,
		}
	},

	isLoading(state, action) {
		return {
			...state,
			isLoading: true,
		}
	},

	setId(state, action) {
		return {
			...state,
			_id: action.payload,
		}
	},
}

const conversationSlice = createSlice({
	name: 'conversation',
	initialState: {
		recipient: {
			userName: '',
			_id: '',
		},
		messages: [],
		messageField: '',
		isOpen: false,
		isLoading: false,
	},
	reducers: reducer,
})

export const onSendButtonClick = async (dispatch, state) => {
	
	// if the conversation state has an id, the conversation already exists in
	// the DB and should send a message rather than create a new conversation
	if(state._id){
		return 
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

export const onMessageFieldChange = (dispatch, e) => {
	dispatch(messageFieldChange(e.target.value))
}

export const onOpenChat = (
	dispatch,
	recipientId,
	recipientUserName,
	existingConversations
) => {
	const existingChat = existingConversations.find((c) =>
		c.participants.includes(recipientId)
	)

	dispatch(setRecipient({ id: recipientId, userName: recipientUserName }))

	if (existingChat) {
		// give the messages an align value based on the user that authored it
		const alignedMessages = existingChat.messages.map((msg) => ({
			...msg,
			align: msg.sentBy === recipientId ? 'left' : 'right',
		}))

		dispatch(setMessages(alignedMessages))
	}

	dispatch(chatOpen())
}

export const {
	chatClosed,
	chatOpen,
	setMessages,
	setRecipient,
	messageFieldChange,
	setId,
} = conversationSlice.actions

export const conversationReducer = conversationSlice.reducer
