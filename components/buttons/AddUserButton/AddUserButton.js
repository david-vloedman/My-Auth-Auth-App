import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import axios from 'axios'
import { useState } from 'react'

const url = (uid) => `/api/friends/addFriend/${uid}`

export default function AddUserButton(props) {
	const { user, setAlert } = props

	const [request, setRequest] = useState({
		loading: false,
		error: false,
	})


	const onClick = async () => {
		try {
			setRequest({
				loading: true,
				error: false,
			})
			const response = await axios.post(url(user._id))
			setRequest({
				loading: false,
				error: false,
				success: true,
			})
      setAlert({
        message: `Successfully added ${user.userName}`,
        open: true
      })
		} catch (error) {
			setRequest({
				loading: false,
				error: true,
			})
		}
	}

	return (
		<>
			
			<IconButton onClick={onClick}>
				{request.loading ? (
					<CircularProgress />
				) : (
					<Add disabled={request.error} />
				)}
			</IconButton>
		</>
	)
}
