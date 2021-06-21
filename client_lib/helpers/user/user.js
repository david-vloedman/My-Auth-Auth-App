import axios from 'axios'
import { setUser, loggedIn, loggedOut } from 'redux/reducers'
const logoutUrl = '/api/session/logout'
const loginUrl = '/api/session/login'

export const logout = async (dispatch, router) => {
	try {
		const response = await axios.get(logoutUrl)
		router.push('/')
		dispatch(loggedOut())
		
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const login = async (dispatch, formData) => {
	try {
		const response = await axios.post(loginUrl, formData)
		const { data } = response

		if (data.loggedIn) {
			dispatch(setUser(data.user))
			dispatch(loggedIn())
		}

		return data
	} catch (error) {
		console.error(error)
	}
}
