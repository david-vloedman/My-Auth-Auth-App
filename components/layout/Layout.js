import CssBaseLine from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import MenuDrawer from './MenuDrawer'
import AppBar from '../appBar/AppBar'
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from '../../redux/reducers'

const ifNoUser = (dispatch, user) => dispatch(Actions.setUser({...user}))

export default function Layout(props) {
	const { user } = props

	const dispatch = useDispatch()

	const { loggedIn, showDrawer } = useSelector((state) => state.layout)

	const reduxUser = useSelector((state) => state.user.user)
	
	if (!reduxUser) {
		ifNoUser(dispatch, user)
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
