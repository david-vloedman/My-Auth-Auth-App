import axios from 'axios'
import { logout as logoutCreator } from 'redux/reducers'

const logoutUrl = '/api/session/logout'
const loginUrl = '/api/session/login'

export const logout = async (dispatch) => {
	try {
		await axios.get(logoutUrl)
		dispatch(logoutCreator())
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export const login = async (dispatch, formData) => {
	try {
		const response = await axios.post(loginUrl, formData)

		console.log(response)
	} catch (error) {}
}
