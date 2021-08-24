import Snackbar from '@material-ui/core/Snackbar'
import { connect } from 'react-redux'
import { onAlertClose } from 'redux/snackbar'

function SnackBar({ alertMessage, isOpen, dispatch }) {
	
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			autoHideDuration={3000}
			message={alertMessage}
			open={isOpen}
			onClose={() => dispatch(onAlertClose())}
			color='secondary'
		/>
	)
}
const mapStateToProps = (state, ownProps) => ({
  alertMessage: state.snackBar.alertMessage,
  isOpen: state.snackBar.isOpen,
})

export default connect(mapStateToProps)(SnackBar)