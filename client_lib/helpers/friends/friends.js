import axios from 'axios'
import { alert, onAlertClose } from 'redux/snackbar'
import { friendAdded, friendRemoved } from 'redux/reducers'

const removeFriendURL = (uid) => `/api/friends/removeFriend/${uid}`
const addFriendURL = (uid) => `/api/friends/addFriend/${uid}`

export const removeFriend = async (dispatch, uid, setRequest) => {
	try {
		setRequest({
			loading: true,
			error: false,
		})
		const response = await requestRemoveFriend(uid)

		setRequest({
			loading: false,
		})

		if (response?.status === 200) {
			dispatch(friendRemoved(uid))
      
			return dispatch(
				alert({
					alertMessage: response.data.message,
				})
			)
		}
		dispatch(alert({ alertMessage: response.data.message }))
	} catch (error) {
		console.error(error)
	}
}

export const addFriend = async (dispatch, uid, setRequest) => {
	try {
		setRequest({
			loading: true,
			error: false,
		})

		const response = await requestAddFriend(uid)
    
		setRequest({
			loading: false,
		})

		if (response?.status === 201) {
			return dispatch(alert({ alertMessage: response.data.message }))
		}

		if (response?.status === 200) {
			dispatch(friendAdded(response.data.data))
			return dispatch(alert({ alertMessage: response.data.message }))
		}
		dispatch(alert({ alertMessage: response.message }))
	} catch (error) {
		console.error(error)
	}
}

const requestRemoveFriend = async (uid) => {
	try {
		return await axios.post(removeFriendURL(uid))
	} catch (error) {
		console.error(error)
	}
}

const requestAddFriend = async (uid) => {
	try {
		return await axios.post(addFriendURL(uid))
	} catch (error) {
		console.error(error)
	}
}
