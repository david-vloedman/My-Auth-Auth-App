import { createSlice } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

const createUserFormReducer = {
	createUserFormChange(state, action) {
		console.log(state, action)
		return {
			...state,
			createUserForm: {
				...state.createUserForm,
				hasError: false,
				[action.payload.key]: action.payload.value,
			},
		}
	},

	createUserFormError(state, action) {
		return {
			...state,
			createUserForm: {
				...state.createUserForm,
				hasError: true,
				error: action.payload,
			},
		}
  },
  
  createUserFormSubmit(state, action){
    return {
      ...state,
    }
  }
}

const createUserFormSlice = createSlice({
	name: 'createUserFormSlice',
	initialState: {},
	reducers: createUserFormReducer,
})

export const {
	createUserFormChange,
  createUserFormError,
  createUserFormSubmit
} = createUserFormSlice.actions

const reducers = combineReducers({
	createUserFormSlice: createUserFormSlice.reducer,
})

export default reducers
