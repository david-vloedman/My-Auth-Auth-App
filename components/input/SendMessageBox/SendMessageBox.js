import {
	Box,
	IconButton,
	TextField,
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
export default function SendMessageBox(props) {
	const { onClick, onChange } = props

	return (
		<Box display={'inline-flex'} width={'100%'} alignItems={'center'}>
			<Box flexGrow={'3'}>
			<TextField
				variant='outlined'
        id='messageField'
        name='messageField'
				onChange={onChange}
				data-test-id='messageField'
				fullWidth
				multiline
			/>
			</Box>
			<Box ml={'.5rem'}>
			<IconButton onClick={onClick} data-test-id='sendBtn'>
				<SendIcon />
			</IconButton>
			</Box>
		</Box>
	)
}
