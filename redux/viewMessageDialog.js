import { createSlice } from '@reduxjs/toolkit'

const reducer = {
	viewMessageDialogOpen(state, action) {
		return {
			...state,
			isOpen: true,
			message: action.payload,
		}
	},
	viewMessageDialogClosed(state, action) {
		return {
			...state,
			isOpen: false,
			message: undefined,
		}
	},
}

const viewMessageDialogSlice = createSlice({
	name: 'ViewMessageDialog',
	initialState: {
		isOpen: false,
	},
	reducers: reducer,
})

export const viewMessageDialogReducer = viewMessageDialogSlice.reducer
export const {
	viewMessageDialogOpen,
	viewMessageDialogClosed,
} = viewMessageDialogSlice.actions
