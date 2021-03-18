import { createSlice } from '@reduxjs/toolkit'


const reducer = {
  composeMessageDialogClosed(state, action){
    return {
      ...state,
      isOpen: false,
      message: undefined
    }
  },
  composeMessageDialogOpen(state, action){
    const {recipientId, senderId, recipientUserName } = action.payload
    return {
      ...state,
      isOpen: true,
      messageForm : {
        ...state.messageForm,
        recipient: recipientId,
        recipientDisplay: recipientUserName,
        sender: senderId
      }
    }
  },
}

const composeMessageDialogSlice = createSlice({
  name: 'ComposeMessageDialog',
  initialState: {
    isOpen: false
  },
  reducers: reducer
})



export const composeMessageDialogReducer = composeMessageDialogSlice.reducer
export const {composeMessageDialogClosed, composeMessageDialogOpen} = composeMessageDialogSlice.actions