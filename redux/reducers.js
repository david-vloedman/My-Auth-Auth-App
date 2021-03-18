import { createSlice } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { friendsPageReducer } from './friendsPageSlice'
import { composeMessageDialogReducer } from './composeMessageDialog'
import { viewMessageDialogReducer } from './viewMessageDialog'

const layoutReducer = {
	toggleLoggedIn(state, payload) {
		return {
			...state,
			loggedIn: !state.loggedIn,
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
		
		return {
			...state,
			...action.payload,
			loggedIn: true
		}
	},
	unsetUser(state, action) {
		return {
			...state,
			user: undefined,
			loggedIn: false
		}
	},
	friendAdded(state, action) {
		return {
			...state,
			...action.payload
		}
	},
	friendRemoved(state, action) {
		return {
			...state,
			...action.payload
		}
	},
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
} = userSlice.actions

export const { toggleLoggedIn, toggleDrawer } = layoutSlice.actions

const reducers = combineReducers({
	layout: layoutSlice.reducer,
	user: userSlice.reducer,
	friendsPage: friendsPageReducer,
	composeMessageDialog: composeMessageDialogReducer,
	viewMessageDialog: viewMessageDialogReducer
})

export default reducers
