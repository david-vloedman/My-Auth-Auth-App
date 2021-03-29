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
	messageSent(state, action){
		return {
			...state,
			messageField: ''
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
			intervalId: action.payload
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

	setConversation(state, action){
		return {
			...state,
			...action.payload
		}
	},

	failedToLoad(state, action){
		return {
			...state,
			failedToLoad: true
		}
	}
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



export const onMessageFieldChange = (dispatch, e) => {
	dispatch(messageFieldChange(e.target.value))
}


export const {
	chatClosed,
	chatOpen,
	setMessages,
	setRecipient,
	messageFieldChange,
	setId,
	messageSent,
	setConversation,
	failedToLoad
} = conversationSlice.actions

export const conversationReducer = conversationSlice.reducer
