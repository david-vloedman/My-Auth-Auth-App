import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import SendIcon from '@material-ui/icons/Send'
import axios from 'axios'
import { useState } from 'react'

const url = (uid) => `/api/messages/sendMessage/${uid}`

export default function SendMessageButton(props) {
	const { onSendMessage, friend } = props

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

			const response = await axios.post(url(friend._id))

			setRequest({
				loading: false,
				error: false,
				success: true,
			})

			onSendMessage(response.data?.data)
		} catch (error) {
			console.log(error)
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
					<SendIcon disabled={request.error} />
				)}
			</IconButton>
		</>
	)
}
