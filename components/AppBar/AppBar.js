import Toolbar from '@material-ui/core/Toolbar'
import * as Styles from './AppBar.styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import NewMessageCounter from 'components/NewMessageCounter/NewMessageCounter'
import { Box } from '@material-ui/core'


export default function AppBar({ loggedIn, toggleDrawer }) {
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
						<Typography component='h1' variant='h5' color={'secondary'}>
							Time Will Tell
						</Typography>
					</Styles.FlexGrowOne>
					<Box m={'1rem'}>
					<NewMessageCounter />
					</Box>
					{loggedIn ? <MenuButton /> : null}
				</Toolbar>
			</Styles.StyledAppBar>
		</div>
	)
}
