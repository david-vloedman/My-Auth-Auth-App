import axios from 'axios'
import Chess from 'chess.js'
import { gameLoaded, gameError } from 'redux/chessSlice/chessSlice'
import { createMatchState } from 'server_lib/helpers/chess/chess'

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
	const match = new Chess(fenString)
	match.move(move)
	return match
}

export const makeMove = async (dispatch, move, matchState) => {
	console.log(move)
	const updatedMatch = validateMove(matchState.fenString, move)
	
	const updatedMatchState = createMatchState(
		updatedMatch,
		matchState.game.players,
		matchState.game.matchId,
		matchState.player.id
	)
	loadMatchIntoState(dispatch, updatedMatchState)

	console.log(matchState.game.fenString === updatedMatch.fen())
	if (updatedMatch.fen() !== matchState.game.fenString) {
		try {
			const response = await requestPlayerMove(dispatch, move, matchState.game.matchId)
			console.log(response)
		} catch (error) {
			console.error(error)
		}
	}
}
