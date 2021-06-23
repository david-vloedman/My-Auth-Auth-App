import axios from 'axios'
import { Chess } from 'chess.js'
import { gameLoaded, gameError } from 'redux/chessSlice/chessSlice'

/**
 * Start the match
 * @param {*} dispatch
 * @param {*} router
 * @param {*} friendId
 */
export const startNewMatch = async (dispatch, router, friendId) => {
	const matchId = await requestNewMatch(dispatch, friendId)
	router.push(`/chess?mid=${matchId}`)
}

/**
 * Request a new match from the server
 * @param {*} dispatch
 * @param {*} friendId
 * @returns
 */
const requestNewMatch = async (dispatch, friendId) => {
	try {
		const response = await axios.post(`/api/chess/match/new/${friendId}`)

		if (response.status === 200) {
			const matchId = response.data
			return matchId
		}
	} catch (error) {
		console.error(error)
		dispatch(gameError('failed to create game'))
	}
}

export const requestPlayerMove = async (dispatch, move, matchId) => {
	try {
		const { data } = await axios.post(`/api/chess/match/update/${matchId}`, {
			move: move,
		})

		if (data.hasError) return

		loadMatchIntoState(dispatch, data)
	} catch (error) {
		console.error(error)
	}
}

export const loadMatchIntoState = (dispatch, matchState) => {
	dispatch(gameLoaded(matchState))
}

const validateMove = (fenString, move) => {
	
}
