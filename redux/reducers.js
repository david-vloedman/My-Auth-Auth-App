import { createSlice } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

const createUserFormReducer = {
	userCreated(state, action) {
		return {
			...state,
		}
	},
}

const userSessionReducer = {
	logIn(state, action) {
		return {
			...state,
			session: {
				...action.payload,
			},
		}
	},


	logOut(state, action) {
		return {
			...state,
			session: undefined,
		}
	},
}

const createUserFormSlice = createSlice({
	name: 'createUserFormSlice',
	initialState: {},
	reducers: createUserFormReducer,
})

const userSessionSlice = createSlice({
	name: 'session',
	initialState: {},
	reducers: userSessionReducer,
})

export const { userCreated } = createUserFormSlice.actions

export const { loggedIn, logOut } = userSessionSlice.actions

const reducers = combineReducers({
	createUserFormSlice: createUserFormSlice.reducer,
	session: userSessionSlice.reducer,
})

export default reducers
