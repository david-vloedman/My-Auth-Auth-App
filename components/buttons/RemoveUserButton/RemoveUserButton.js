import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/Delete'
import axios from 'axios'
import { useState } from 'react'
import * as Actions from '../../../redux/reducers'
import {useDispatch, useSelector} from 'react-redux'

const url = (uid) => `/api/friends/removeFriend/${uid}`

export default function RemoveUserButton(props) {
	
  const { onRemoveFriend, friend } = props
	
	const [request, setRequest] = useState({
		loading: false,
		error: false,
	})

  const onClick = async () => {
		
		try {
			setRequest({
				...request,
				loading: true,
				error: false,
			})
			
			const response = await axios.post(url(friend._id))

			setRequest({
				...request,
				loading: false,
				error: false,
				success: true,
			})
			console.log(response.data?.data.friends)
			onRemoveFriend(response.data?.data?.friends)
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
