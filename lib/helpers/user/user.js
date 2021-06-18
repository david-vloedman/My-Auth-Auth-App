import axios from 'axios'
import * as Actions from 'redux/reducers'

const logoutUrl = '/api/session/logout'

export const logout = async (dispatch) => {
	try {
		await axios.get(logoutUrl)
		dispatch(Actions.logout())
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}
