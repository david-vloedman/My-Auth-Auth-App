import * as Styles from './UserDashboard.styles'
import Box from '@material-ui/core/Box'
import LogoutButton from '../logout/LogoutButton'
import FriendsList from '../friends/friendsList/FriendsList'


const UserDashboard = (props) => {
  const user = props
  
  return (
    <div>
      <div>Welcome, {user.name}!</div>
      <LogoutButton />

      <div>
        <FriendsList />
      </div>
    </div>
  )
}

export default UserDashboard

// UserDashboard.propTypes = {

// }