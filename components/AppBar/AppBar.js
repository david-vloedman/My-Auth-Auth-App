import Toolbar from '@material-ui/core/Toolbar'
import * as Styles from './AppBar.styles'
import IconButton from '@material-ui/core/IconButton'

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
					<Styles.StyledTitle variant='h6'>Nothing App</Styles.StyledTitle>
					{loggedIn ? <MenuButton /> : null}
				</Toolbar>
			</Styles.StyledAppBar>
		</div>
	)
}
