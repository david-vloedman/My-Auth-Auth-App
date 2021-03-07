import CssBaseLine from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import { useState } from 'react'
import MenuDrawer from './MenuDrawer'
import AppBar from '../appBar/AppBar'

export default function Layout({ props, children }) {
	const [showDrawer, setShowDrawer] = useState(false)
	
	const [loggedIn, setLoggedIn] = useState(false);

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
		<AppBar props={{toggleDrawer:toggleDrawer, loggedIn:loggedIn}}/>
		<StyledContainer>{children}</StyledContainer>
		</div>
	)
}

const StyledContainer = styled(Container)`
	background-color: #e8e8e8;
	min-height: 100vh;
	display: flex;
	padding-top: 1rem;
`
