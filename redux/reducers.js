import { createSlice } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

const createUserFormReducer = {
  userCreated(state, action){
    return {
      ...state,
    }
  }
}

const userSessionReducer = {
	loggedIn(state, action){
		return {
			...state,
			session: {
				loggedIn: true,
				user: action.payload
			}
		}
	},

	loggedOut(state, action){
		return {
			...state,
			sessions: {
				loggedIn: false,
				user: undefined
			}
		}
	}
}

const createUserFormSlice = createSlice({
	name: 'createUserFormSlice',
	initialState: {},
	reducers: createUserFormReducer,
})

const userSessionSlice = createSlice({
	name: 'userSessionSlice',
	initialState: {
		loggedIn: false,
	},
	reducers: userSessionReducer
})

export const {
  userCreated
} = createUserFormSlice.actions

export const {
	loggedIn,
	loggedOut
} = userSessionSlice.actions

const reducers = combineReducers({
	createUserFormSlice: createUserFormSlice.reducer,
	userSessionSlice: userSessionSlice.reducer
})

export default reducers
