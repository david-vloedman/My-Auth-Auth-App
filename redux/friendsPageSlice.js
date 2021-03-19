import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const pageReducer = {
  closeDialog(state, action){
    return {
      ...state,
      dialogOpen: false,
      messageForm: {}
    }
  },

  openNewMessageDialog(state, action){
    const {recipientId, senderId, recipientUserName } = action.payload
    return {
      ...state,
      dialogOpen: true,
      messageForm : {
        ...state.messageForm,
        recipient: recipientId,
        recipientDisplay: recipientUserName,
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
      ...state,
      messageForm: {
        ...state.messageForm,
        loading: true
      }
    }
  },
  onMessageSent(state, action){
    return {
      ...state,
      messageForm: {},

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

export const {closeDialog, openNewMessageDialog, onMessageFormChange, onMessageFormSubmit, onMessageSent } = friendsPageSlice.actions