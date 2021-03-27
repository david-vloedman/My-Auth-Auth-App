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
		console.log(action)
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
	messageAdded,
} = conversationSlice.actions

export const conversationReducer = conversationSlice.reducer
