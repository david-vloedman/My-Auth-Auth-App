import CssBaseLine from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import MenuDrawer from './MenuDrawer'
import AppBar from '../appBar/AppBar'
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from '../../redux/reducers'

export default function Layout({ props, children }) {
	const { loggedIn, showDrawer } = useSelector((state) => state.layout)
	const { user } = useSelector((state) => state)
	const dispatch = useDispatch()

	const dispatchDrawerToggle = () => {
		dispatch(Actions.toggleDrawer())
	}

	return (
		<>
		<CssBaseLine />
			{loggedIn ? (
				<MenuDrawer
					open={showDrawer}
					onClose={dispatchDrawerToggle}
					toggleDrawer={dispatchDrawerToggle}
				/>
			) : null}

			<AppBar props={{ toggleDrawer: dispatchDrawerToggle, loggedIn }} />
			
			<StyledContainer>
				

				{children}
			</StyledContainer>
		</>
	)
}

const StyledContainer = styled(Container)`
	background-color: #e8e8e8;
	min-height: 100vh;
`


