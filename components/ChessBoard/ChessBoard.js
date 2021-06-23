import { Box } from '@material-ui/core'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'

export function ChessBoard({ fenString, orientation }) {
	const Chessboard = dynamic(() => import('chessboardjsx'), { ssr: false })

	return (
		<Box id='chessBoard' ml={'auto'} mr={'auto'}>
			<Chessboard width={340} position={fenString} orientation={orientation} />
		</Box>
	)
}

export default connect((state) => ({
	fenString: state.chess.game.fenString,
	orientation: state.chess.game.players.white === state.user.id ? 'white' : 'black',
}))(ChessBoard)
