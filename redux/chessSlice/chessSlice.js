import { createSlice } from '@reduxjs/toolkit'

const reducer = {
	gameLoaded(state, action) {
		return {
			game: action.payload.game,
			player: action.payload.player
		}
	},

	setAvailableMoves(state, action) {
		return {
			...state,
			player: {
				...state.player,
				availableMoves: action.payload,
			},
		}
	},
  gameError(state, action){
    return {
      ...state,
      game: {
        ...state.game,
        error: action.payload
      }
    }
  },

	startMatchPolling(state, action){
		return {
			...state,
			game: {
				...state.game,
				pollId: action.payload
			}
		}
	},

	endMatchPolling(state, action){
		return {
			...state, 
			game: {
				...state.game,
				pollId: undefined
			}
		}
	}
}

const chessGame = createSlice({
	name: 'ChessGame',
	initialState: {
		game: {
			fenString: '',
			check: false,
			checkMate: false,
		},
		player: {
			availableMoves: [],
			advantage: '',
			orientation: '',
		},
	},
	reducers: reducer,
})

export const chessReducer = chessGame.reducer

export const { gameLoaded, setAvailableMoves, gameError } = chessGame.actions
