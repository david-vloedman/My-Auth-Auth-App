import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import IconButton from '@material-ui/core/IconButton'
import {startNewMatch} from 'lib/helpers/chess/chess'
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

export function NewMatchButton({friendId, dispatch}){

  const router = useRouter()

  const onClick = () => {
    startNewMatch(dispatch, router, friendId)
  }
  return (
    <IconButton onClick={onClick}>
      <VideogameAssetIcon />
    </IconButton>
  )
}

export default connect((state, ownProps) => ({...ownProps}))(NewMatchButton)