import { Box } from '@material-ui/core'
import ChessBoard from 'components/ChessBoard/ChessBoard'
import { connect } from 'react-redux'

export default function ChessContainer({matchState}){

  return (
    <Box>
      <ChessBoard />
    </Box>
  )
}





