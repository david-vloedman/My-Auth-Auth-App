import Toolbar from '@material-ui/core/Toolbar'
import * as Styles from './AppBar.styles'
import IconButton from '@material-ui/core/IconButton'
import LogoutButton from '../buttons/LogoutButton'

export default function AppBar({props}){
  const {loggedIn, toggleDrawer} = props

  return (
    <div>
    <Styles.StyledAppBar position='static'>
      <Toolbar>
        <IconButton edge='start' onClick={() => toggleDrawer()}>
          {loggedIn ? <Styles.StyledMenuIcon /> : null}
        </IconButton>
        <Styles.StyledTitle variant='h6'>Nothing App</Styles.StyledTitle>
        {loggedIn ? <LogoutButton color='inherit'>Logout</LogoutButton> : null}
        
      </Toolbar>
    </Styles.StyledAppBar>
  </div>
  )
}