import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/Delete'
import { connect } from 'react-redux'
import { useState } from 'react'
import {removeFriend} from 'client_lib/helpers/friends/friends'

function RemoveUserButton({friend, dispatch }) {

	const [request, setRequest] = useState({
		loading: false,
		error: false,
	})

	return (
		<>
			<IconButton onClick={() => removeFriend(dispatch, friend._id, setRequest)}>
				{request.loading ? (
					<CircularProgress />
				) : (
					<DeleteIcon disabled={request.error} />
				)}
			</IconButton>
		</>
	)
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps,
})

export default connect(mapStateToProps)(RemoveUserButton)
