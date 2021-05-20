import axios from 'axios'
import { Chess } from 'chess.js'
import { gameLoaded, gameError, setAvailableMoves } from 'redux/chessSlice/chessSlice'

export const startNewMatch = (dispatch, router, friendId) => {
  
  requestNewMatch(dispatch, friendId)
  router.push('/chess')
}

const requestNewMatch = async (dispatch, friendId) => {
	try {
		const response = await axios.post(`/api/chess/match/new/${friendId}`)
    
		if (response.status === 200) {
			const gameObj = response.data
			return dispatch(gameLoaded(gameObj))
		}

		dispatch(gameError('failed to create game'))
	} catch (error) {
		console.error(error)
		dispatch(gameError('failed to create game'))
	}
}
