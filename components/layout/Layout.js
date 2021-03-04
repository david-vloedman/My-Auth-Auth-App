import CssBaseLine from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Backdrop from '@material-ui/core/Backdrop'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import styled from 'styled-components'
import LogoutButton from '../logout/LogoutButton'
import { useState } from 'react'
import MenuDrawer from './MenuDrawer'

export default function Layout({ props, children }) {
	const [showDrawer, setShowDrawer] = useState(false)
	
	const toggleDrawer = () => {
		setShowDrawer(!showDrawer)
	}

	return (
		<div>
			<CssBaseLine />
			<MenuDrawer
				open={showDrawer}
				onClose={toggleDrawer}
				toggleDrawer={toggleDrawer}
			/>
			<div>
				<StyledAppBar position='static'>
					<Toolbar>
						<IconButton edge='start' onClick={() => toggleDrawer()}>
							<StyledMenuIcon />
						</IconButton>
						<StyledTitle variant='h6'>Nothing App</StyledTitle>
						<LogoutButton color='inherit'>Logout</LogoutButton>
					</Toolbar>
				</StyledAppBar>
				<StyledContainer>{children}</StyledContainer>
			</div>
		</div>
	)
}

const StyledAppBar = styled(AppBar)`
	
`

const StyledTitle = styled(Typography)`
	flex-grow: 1;
`

const StyledMenuIcon = styled(MenuIcon)`
	color: #ffffff;
`

const StyledContainer = styled(Container)`
	background-color: #e8e8e8;
`
