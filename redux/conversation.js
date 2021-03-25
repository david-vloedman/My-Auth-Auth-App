import { createSlice } from '@reduxjs/toolkit'

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

  messageFieldChange(state, action){
    return {
      ...state,
      messageField: action.payload
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
	},
	reducers: reducer,
})

export const {
	chatClosed,
	chatOpen,
	setMessages,
	setRecipient,
  messageFieldChange,
} = conversationSlice.actions

export const conversationReducer = conversationSlice.reducer
