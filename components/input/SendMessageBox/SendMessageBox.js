import {
	Box,
	IconButton,
	TextField,
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import {onSendButtonClick, onMessageFieldChange} from 'redux/conversation'
import {connect} from 'react-redux'

function SendMessageBox({conversation, dispatch}) {

	return (
		<Box display={'inline-flex'} width={'100%'} alignItems={'center'}>
			<Box flexGrow={'3'}>
			<TextField
				variant='outlined'
        id='messageField'
        name='messageField'
				onChange={ (e) => onMessageFieldChange(dispatch, e)}
				data-test-id='messageField'
				fullWidth
				multiline
			/>
			</Box>
			<Box ml={'.5rem'}>
			<IconButton onClick={() => onSendButtonClick(dispatch, conversation)} data-test-id='sendBtn'>
				<SendIcon />
			</IconButton>
			</Box>
		</Box>
	)
}

const mapStateToProps = (state) => ({conversation: state.conversation})

export default connect(mapStateToProps)(SendMessageBox)
