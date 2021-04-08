import { Box } from '@material-ui/core'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'

export function ChessBoard({ fenString }) {

	const Chessboard = dynamic(() => import('chessboardjsx'), { ssr: false })

	return (
		<Box id='chessBoard' ml={'auto'} mr={'auto'}>
			<Chessboard width={340} position={fenString} />
		</Box>
	)
}

export default connect((state) => ({ fenString: state.chess.game.fenString }))(ChessBoard)
