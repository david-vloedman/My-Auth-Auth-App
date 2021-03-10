import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/Delete'
import axios from 'axios'
import { useState } from 'react'

const url = (uid) => `/api/friends/removeFriend/${uid}`

export default function RemoveUserButton(props) {

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
      console.log(response)
			setRequest({
				loading: false,
				error: false,
				success: true,
			})
      setAlert({
        message: `Successfully removed ${user.userName}`,
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
					<DeleteIcon disabled={request.error} />
				)}
			</IconButton>
		</>
	)
}
