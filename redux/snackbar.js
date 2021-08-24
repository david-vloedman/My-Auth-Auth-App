import { createSlice } from '@reduxjs/toolkit'

const reducer = {
	alert(state, action) {
		const { alertMessage } = action.payload

		return {
			isOpen: true,
			alertMessage,
		}
	},
	onAlertClose(state, action) {
		return {
			...state,
			isOpen: false,
		}
	},
}

const snackbarSlice = createSlice({
	name: 'snackbar',
	initialState: {
		isOpen: false,
	},
	reducers: reducer,
})

export const snackbarReducer = snackbarSlice.reducer
export const { alert, onAlertClose } = snackbarSlice.actions
