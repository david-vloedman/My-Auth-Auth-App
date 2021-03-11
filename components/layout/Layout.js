import CssBaseLine from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import MenuDrawer from './MenuDrawer'
import AppBar from '../appBar/AppBar'
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from '../../redux/reducers'

export default function Layout(props) {
	const { user } = props
	const dispatch = useDispatch()
	
	const { loggedIn, showDrawer } = useSelector((state) => state.layout)
	const reduxUser = useSelector((state) => state.user)

	// if there is no user in redux state, set it to the state given by the server
	if (Object.keys(reduxUser).length === 0 && Object.keys(user).length > 0) {
		console.log("SETTING USER")
		dispatch(Actions.setUser(user))
		dispatch(Actions.toggleLoggedIn())
	}
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

			<StyledContainer>{{ ...props.children }}</StyledContainer>
		</>
	)
}

const StyledContainer = styled(Container)`
	background-color: #e8e8e8;
	min-height: 100vh;
`
