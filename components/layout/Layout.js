import CssBaseLine from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import MenuDrawer from '../MenuDrawer/MenuDrawer'
import AppBar from '../AppBar/AppBar'
import { toggleDrawer } from 'client_lib/helpers/layout/layout.js'
import { logout } from 'client_lib/helpers/user/user'
import { connect } from 'react-redux'
import SnackBar from 'components/SnackBar/SnackBar.js'

export function Layout({ loggedIn, showDrawer, children, dispatch }) {

	return (
		<>
		
			<AppBar toggleDrawer={() => toggleDrawer(dispatch)} loggedIn={loggedIn} />
			<StyledContainer>
				<CssBaseLine />
				
				{loggedIn ? (
					<MenuDrawer
						open={showDrawer}
						onClose={() => toggleDrawer(dispatch)}
						toggleDrawer={() => toggleDrawer(dispatch)}
						logout={() => logout(dispatch)}
					/>
				) : null}
				{children}
				
			</StyledContainer>
			<SnackBar />
		</>
	)
}

const mapStateToProps = (state, ownProps) => ({
	user: state.user,
	loggedIn: state.layout.loggedIn,
	showDrawer: state.layout.showDrawer,
	...ownProps,
})

export default connect(mapStateToProps)(Layout)

const StyledContainer = styled(Container)`
	background-color: #e8e8e8;
	min-height: 100vh;
	padding-top: 1rem;
`
