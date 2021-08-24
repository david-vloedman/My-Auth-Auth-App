import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import { useState } from 'react'
import { connect } from 'react-redux'
import { addFriend } from 'client_lib/helpers/friends/friends'

function AddUserButton({ user, dispatch }) {
	const [request, setRequest] = useState({
		loading: false,
		error: false,
	})

	return (
		<>
			<IconButton onClick={() => addFriend(dispatch, user._id, setRequest)}>
				{request.loading ? (
					<CircularProgress />
				) : (
					<Add disabled={request.error} />
				)}
			</IconButton>
		</>
	)
}

const mapStateToProps = (state, ownProps) => ({
	...ownProps,
})

export default connect(mapStateToProps)(AddUserButton)
