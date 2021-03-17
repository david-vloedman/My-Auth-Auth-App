import { createSlice } from '@reduxjs/toolkit'

const reducer = {
  dialogOpen(state, action){
    return {
      ...state,
      dialog: {
        dialogOpen: true,
        message: action.payload
      }
    }
  },

  dialogClose(state, action){
    return {
      ...state,
      dialog: {
        dialogOpen: false
      }
    }
  }
}

const messagesPageSlice = createSlice({
	name: 'messagePage',
	initialState: {
		dialog: { dialogOpen: false, message: '' },
	},
  reducers: reducer
})


export const {dialogOpen, dialogClose} = messagesPageSlice.actions

export const messagesPageReducer = messagesPageSlice.reducer

