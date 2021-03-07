import Toolbar from '@material-ui/core/Toolbar'
import * as Styles from './AppBar.styles'
import IconButton from '@material-ui/core/IconButton'
import LogoutButton from '../buttons/LogoutButton'

export default function AppBar({ props }) {
	const { loggedIn, toggleDrawer } = props

	const MenuButton = () => {
		return (
			<IconButton edge='start' onClick={toggleDrawer}>
				<Styles.StyledMenuIcon />
			</IconButton>
		)
	}

	return (
		<div>
			<Styles.StyledAppBar position='static'>
				<Toolbar>
					{loggedIn ? <MenuButton /> : null}
					<Styles.StyledTitle variant='h6'>Nothing App</Styles.StyledTitle>
					{loggedIn ? (
						<LogoutButton color='inherit'>Logout</LogoutButton>
					) : null}
				</Toolbar>
			</Styles.StyledAppBar>
		</div>
	)
}
