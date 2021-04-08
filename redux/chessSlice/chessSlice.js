import { createSlice } from '@reduxjs/toolkit'

const reducer = {
	gameLoaded(state, action) {
    console.log(action.payload)
		return {
			...state,
			game: {
        ...state.game,
				...action.payload,
			},
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
