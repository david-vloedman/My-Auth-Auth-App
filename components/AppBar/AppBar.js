import Toolbar from '@material-ui/core/Toolbar'
import * as Styles from './AppBar.styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

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
					<Styles.FlexGrowOne>
					<Typography component='h1' variant='h5' color={'secondary'}>Time Will Tell</Typography>
					</Styles.FlexGrowOne>
					{loggedIn ? <MenuButton /> : null}
				</Toolbar>
			</Styles.StyledAppBar>
		</div>
	)
}
