import * as Styles from './UserDashboard.styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import LogoutButton from '../logout/LogoutButton'
import FriendsList from '../friends/friendsList/FriendsList'


const UserDashboard = (props) => {
  const user = props
  
  const onAddFriendClick = (e) => {
    // show all users
  }

  const showAllUsers = () => {
    // display and retrieve list of all users
  }

  const getAllUsers = () => {
    // retrieve list of all users
  }

  const UserList = (users) => <ul></ul>

  return (
    <div>
      <div>Welcome, {user.name}!</div>
      <LogoutButton />
      <Button variant='contained'>Add Friend</Button>
      <div>
        <FriendsList />
      </div>
    </div>
  )
}

export default UserDashboard

// UserDashboard.propTypes = {

// }