import {
	Box,
	IconButton,
	TextField,
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
export default function SendMessageBox(props) {
	const { onClick, onChange } = props

	return (
		<Box display={'inline-flex'}>
			<TextField
				variant='outlined'
        id='messageField'
        name='messageField'
				onChange={onChange}
				data-test-id='messageField'
			/>
			<IconButton onClick={onClick} data-test-id='sendBtn'>
				<SendIcon />
			</IconButton>
		</Box>
	)
}
