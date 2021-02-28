import Button from '@material-ui/core/Button'
import fetchJson from '../../lib/fetchJson'
import * as Actions from '../../redux/reducers'
import {useDispatch} from 'react-redux'

const url = '/api/session/logout'

export default function LogoutButton(props){
  const dispatch = useDispatch()
  const onClick = async () => {
    const response = fetchJson(url, {
      method: 'GET'
    })

    dispatch(Actions.logOut())
  }

  return <Button onClick={onClick}>Logout</Button>
}