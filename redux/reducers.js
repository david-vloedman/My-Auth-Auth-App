import { createSlice } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { conversationReducer } from './conversation'
import { chessReducer } from 'redux/chessSlice/chessSlice'
import { viewMessageDialogReducer } from './viewMessageDialog'
import {snackbarReducer} from 'redux/snackbar'

const layoutReducer = {
	loggedIn(state, payload){
		return {
			...state,
			loggedIn: true
		}
	},

	loggedOut(state, payload){
		return {
			...state,
			loggedIn: false
		}
	},



	toggleDrawer(state, payload) {
		return {
			...state,
			showDrawer: !state.showDrawer,
		}
	},
}

const layoutSlice = createSlice({
	name: 'layout',
	initialState: {},
	reducers: layoutReducer,
})

const userReducer = {
	setUser(state, action) {
		console.log(action.payload)
		return {
			...state,
			...action.payload,
			
		}
	},
	unsetUser(state, action) {
		return {
			...state,
			user: undefined,
		}
	},

	friendAdded(state, action) {
		return {
			...state,
			friends: [...state.friends, action.payload]
		}
	},

	friendRemoved(state, action) {
		return {
			...state,
			friends: [...state.friends.filter((fri) => fri._id != action.payload)],
		}
	},
	receivedMessageDeleted(state, action) {
		return {
			...state,
			receivedMessages: [
				...state.receivedMessages.filter((msg) => msg.id !== action.payload),
			],
		}
	},
	conversationAdded(state, action) {
		return {
			...state,
			conversations: [...state.conversations, action.payload],
		}
	},

	logout(state, action) {
		return {
			undefined
		}
	},

	login(state, action){
		return {
			...state,
			...action.payload
		}
	}
}

const userSlice = createSlice({
	name: 'user',
	initialState: {},
	reducers: userReducer,
})

export const {
	setUser,
	unsetUser,
	friendRemoved,
	friendAdded,
	receivedMessageDeleted,
	conversationAdded,
	logout,
	login,
} = userSlice.actions

export const { loggedIn, loggedOut, toggleDrawer } = layoutSlice.actions

const reducers = combineReducers({
	layout: layoutSlice.reducer,
	user: userSlice.reducer,
	viewMessageDialog: viewMessageDialogReducer,
	conversation: conversationReducer,
	chess: chessReducer,
	snackBar: snackbarReducer
})

export default reducers
