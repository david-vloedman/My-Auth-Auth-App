import CssBaseLine from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import MenuDrawer from './MenuDrawer'
import AppBar from '../AppBar/AppBar'
import defaultTheme from '../themes/default'
import Heading from '../Heading/Heading'
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from '../../redux/reducers'
import { useRouter } from 'next/router'
import axios from 'axios'

const logoutUrl = '/api/session/logout'

export default function Layout(props) {
	const { user } = props
	const dispatch = useDispatch()
	const router = useRouter()

	const { loggedIn, showDrawer } = useSelector((state) => state.layout)
	const reduxUser = useSelector((state) => state.user)

	//if there is no user in redux state, set it to the state given by the server
	if (Object.keys(reduxUser).length === 0 && Object.keys(user).length > 0) {
		dispatch(Actions.setUser(user))
		dispatch(Actions.toggleLoggedIn())
	}

	const dispatchDrawerToggle = () => {
		dispatch(Actions.toggleDrawer())
	}

	const dispatchLogout = async () => {
		try {
			dispatch(Actions.unsetUser())
			await axios.get(logoutUrl)
			router.push('/login')
		} catch (error) {
			console.log('failed logout request', { ...error })
		}
	}

	return (
		<>
			<AppBar props={{ toggleDrawer: dispatchDrawerToggle, loggedIn }} />
			<StyledContainer>
				<CssBaseLine />
				{loggedIn ? (
					<MenuDrawer
						open={showDrawer}
						onClose={dispatchDrawerToggle}
						toggleDrawer={dispatchDrawerToggle}
						logout={dispatchLogout}
					/>
				) : null}

				{{ ...props.children }}
			</StyledContainer>
		</>
	)
}

const StyledContainer = styled(Container)`
	background-color: #e8e8e8;
	min-height: 100vh;
	padding-top: 1rem;
`
