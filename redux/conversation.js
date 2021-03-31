import { createSlice } from '@reduxjs/toolkit'

const reducer = {

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

	// In use after refactor
	setConversation(state, action){
		return {
			...state,
			...action.payload
		}
	},

	setRecipient(state, action) {
		return {
			...state,
			recipient: {
				...action.payload,
			},
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

	failedToLoad(state, action){
		return {
			...state,
			failedToLoad: true
		}
	},
	updateLoopStarted(state, action){
		return {
			...state,
			updateIntervalId : action.payload,
		}
	},
	updateLoopTerminated(state, action){
		return {
			...state,
			updateIntervalId: undefined
		}
	},
	messageSent(state, action){
		return {
			...state,
			messageField: ''
		}
	},

	failedToSendMessage(state, action){
		return {
			...state,
			

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
	failedToLoad,
	updateLoopStarted,
	updateLoopTerminated,
	failedToSendMessage
} = conversationSlice.actions

export const conversationReducer = conversationSlice.reducer
