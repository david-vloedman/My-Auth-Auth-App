import { createSlice } from '@reduxjs/toolkit'

const reducer = {
	composeMessageDialogClosed(state, action) {
		return {
			...state,
			isOpen: false,
			message: undefined,
		}
	},
	composeMessageDialogOpen(state, action) {
		console.log(action.payload)
		const {senderId, recipientUserName, recipientId} = action.payload
		
		return {
			...state,
			isOpen: true,
			messageForm: {
				recipient: recipientId,
				recipientDisplay: recipientUserName,
				sender: senderId,
			},
		}
	},
	messageFormChange(state, action) {
		return {
			...state,
			messageForm: {
				...state.messageForm,
				...action.payload,
			},
		}
	},
	messageFormSubmit(state, action) {
		return {
			...state,
			messageForm: {
				...state.messageForm,
				loading: true,
			},
		}
	},
	sendRequestSuccess(state, action) {
		return {
			...state,
      isOpen: false,
      messageForm: {
        loading: false,
      }
		}
	},
  sendRequestFail(state, action){}
}

const composeMessageDialogSlice = createSlice({
	name: 'ComposeMessageDialog',
	initialState: {
		isOpen: false,
		messageForm: {},
	},
	reducers: reducer,
})

export const composeMessageDialogReducer = composeMessageDialogSlice.reducer
export const {
	composeMessageDialogClosed,
	composeMessageDialogOpen,
	messageFormChange,
	messageFormSubmit,
  sendRequestSuccess,
  sendRequestFail
} = composeMessageDialogSlice.actions
