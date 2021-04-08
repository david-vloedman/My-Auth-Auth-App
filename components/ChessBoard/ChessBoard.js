import { Box } from "@material-ui/core";
import dynamic from 'next/dynamic'


export default function ChessBoard({fenString, positionObj}){
  
  const Chessboard = dynamic(() => import ('chessboardjsx'))
  
  return <Box id='chessBoard' ml={'auto'} mr={'auto'}>
    <Chessboard width={340} position={positionObj || fenString}/>  
  </Box>
}