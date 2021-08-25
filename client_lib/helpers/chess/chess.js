import axios from 'axios'
import Chess from 'chess.js'
import { gameLoaded, gameError } from 'redux/chessSlice/chessSlice'
import { createMatchState } from 'server_lib/helpers/chess/chess'
import { startMatchPolling, endMatchPolling} from 'client_lib/helpers/chess/matchPolling'

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

		if (data.hasError) return false
		return true
	} catch (error) {
		console.error(error)
	}
}

export const loadMatchIntoState = (dispatch, matchState) => {
	console.log(matchState.game.matchId)
	startMatchPolling(dispatch, requestMatch, matchState.game.matchId)
	dispatch(gameLoaded(matchState))
	
}

const updateMatch = (fenString, move, userColor) => {
	const match = new Chess(fenString)

	if (match.turn() === userColor[0]) {
		const moveObj = match.move(move)
		return moveObj !== null ? match : null
	}
	return null
}

export const makeMove = async (dispatch, move, matchState, userId) => {
	const updatedMatch = updateMatch(
		matchState.game.fenString,
		move,
		matchState.player.color
	)

	if (updatedMatch) {
		const updatedMatchState = createMatchState(
			updatedMatch,
			matchState.game.players,
			matchState.game.matchId,
			userId
		)

		loadMatchIntoState(dispatch, updatedMatchState)

		try {
			const response = await requestPlayerMove(
				dispatch,
				move,
				matchState.game.matchId
			)
		} catch (error) {
			console.error(error)
		}
	}
}

export const requestMatch = async (dispatch, mid) => {
	try {
		console.log(mid)
		const response = await axios.get(`/api/chess/match/get/${mid}`,)
		
		return response?.data
	} catch (error) {
		console.error(error)
	}
}
