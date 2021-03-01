import * as Styles from './UserDashboard.styles'
import Box from '@material-ui/core/Box'
import LogoutButton from '../logout/LogoutButton'


const UserDashboard = (props) => {
  const user = props
  
  return (
    <div>
      Welcome, {user.name}!
      <LogoutButton />
      </div>
  )
}

export default UserDashboard

// UserDashboard.propTypes = {

// }