import {createSlice} from '@reduxjs/toolkit'

const pageReducer = {
  closeDialog(state, action){
    return {
      ...state,
      dialogOpen: false,
      messageForm: {}
    }
  },

  openNewMessageDialog(state, action){
    const {recipientId, senderId } = action.payload
    return {
      ...state,
      dialogOpen: true,
      messageForm : {
        ...state.messageForm,
        recipient: recipientId,
        sender: senderId
      }
    }
  },

  onMessageFormChange(state, action){
    return {
      ...state,
      messageForm: {
        ...state.messageForm,
        ...action.payload
      }
    }
  },
  onMessageFormSubmit(state, action){
    return {
      ...state
    }
  }
}

const friendsPageSlice = createSlice({
  name: 'friendsPage',
  reducers: pageReducer,
  initialState: {
    dialogOpen: false,
  }
})

export const friendsPageReducer = friendsPageSlice.reducer

export const {closeDialog, openNewMessageDialog, onMessageFormChange, onMessageFormSubmit } = friendsPageSlice.actions