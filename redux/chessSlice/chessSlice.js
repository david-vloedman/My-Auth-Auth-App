import { createSlice } from '@reduxjs/toolkit'

const reducer = {
	setGame(state, action) {
		return {
      ...state,
			game: {
        ...action.payload
      },
		}
	},

  setAvailableMoves(state, action){
    return {
      ...state,
      player: {
        ...state.player,
        availableMoves: action.payload
      }
    }
  }
}

const chessGame = createSlice({
	name: 'ChessGame',
	initialState: {
		game: {
			white: '',
			black: '',
			fenString: '',
      check: false,
      checkMate: false
		},
    player: {
      availableMoves: [],
      advantage: ''
    }
	},
	reducers: reducer,
})
