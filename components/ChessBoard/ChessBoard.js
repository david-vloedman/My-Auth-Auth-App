import { Box } from '@material-ui/core'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import {
	onMoveEnd,
	onDragMove,
	onDrop,
	onSquareClick,
	onDragStart
} from 'client_lib/helpers/chess/chessboard'

export function ChessBoard({ matchState, orientation, dispatch }) {
	
	const Chessboard = dynamic(() => import('chessboardjsx'), { ssr: false })

	return (
		<Box id='chessBoard' ml={'auto'} mr={'auto'}>
			<Chessboard
				width={340}
				position={matchState.game.fenString}
				orientation={orientation}
				onMoveEnd={onMoveEnd}
				onDragMove={onDragMove}
				onDrop={onDrop(dispatch, matchState)}
				onSquareClick={onSquareClick}
				onDragStart={onDragStart}
			/>
		</Box>
	)
}

export default connect((state) => ({
	matchState: state.chess,
	orientation:
		state.chess.player.color
}))(ChessBoard)
