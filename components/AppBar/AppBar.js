import Toolbar from '@material-ui/core/Toolbar'
import * as Styles from './AppBar.styles'
import IconButton from '@material-ui/core/IconButton'
import Heading from '../Heading/Heading'

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
					<Heading variant='h5' text={'Nothing App'}/>
					</Styles.FlexGrowOne>
					{loggedIn ? <MenuButton /> : null}
				</Toolbar>
			</Styles.StyledAppBar>
		</div>
	)
}
