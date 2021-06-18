import CssBaseLine from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import MenuDrawer from '../MenuDrawer/MenuDrawer'
import AppBar from '../AppBar/AppBar'
import { toggleDrawer } from 'lib/helpers/layout/layout.js'
import { connect } from 'react-redux'

export function Layout({loggedIn, showDrawer, children, dispatch}) {
	
	console.log(loggedIn)
	
	

	// //if there is no user in redux state, set it to the state given by the server
	// if (Object.keys(reduxUser).length === 0 && Object.keys(user).length > 0) {
	// 	dispatch(Actions.setUser(user))
	// 	dispatch(Actions.toggleLoggedIn())
	// }


	return (
		<>
			<AppBar toggleDrawer={toggleDrawer} loggedIn={loggedIn}/>
			<StyledContainer>
				<CssBaseLine />
				{loggedIn ? (
					<MenuDrawer
						open={showDrawer}
						onClose={(e) => toggleDrawer(dispatch)}
						toggleDrawer={(e) => toggleDrawer(dispatch)}
						logout={dispatchLogout}
					/>
				) : null}

				{children}
			</StyledContainer>
		</>
	)
}

const mapStateToProps = (state) => ({ user: state.user, loggedIn: state.user.loggedIn, showDrawer: state.layout.showDrawer })

export default connect(mapStateToProps)(Layout)

const StyledContainer = styled(Container)`
	background-color: #e8e8e8;
	min-height: 100vh;
	padding-top: 1rem;
`
