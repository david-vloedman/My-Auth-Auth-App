import { Box, IconButton, TextField } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { onMessageFieldChange } from 'redux/conversation'
import { sendMessage, requestSendMessage } from 'lib/helpers/conversation/conversation'
import { connect } from 'react-redux'

function SendMessageBox({ conversation, dispatch }) {
	return (
		<Box display={'inline-flex'} width={'100%'} alignItems={'center'}>
			<Box flexGrow={'3'}>
				<TextField
					variant='outlined'
					id='messageField'
					name='messageField'
					onChange={(e) => onMessageFieldChange(dispatch, e)}
					value={conversation.messageField}
					data-test-id='messageField'
					fullWidth
					multiline
				/>
			</Box>
			<Box ml={'.5rem'}>
				<IconButton
					onClick={() => sendMessage(dispatch, conversation._id, requestSendMessage, conversation.messageField)}
					data-test-id='sendBtn'
				>
					<SendIcon />
				</IconButton>
			</Box>
		</Box>
	)
}

const mapStateToProps = (state) => ({ conversation: state.conversation })

export default connect(mapStateToProps)(SendMessageBox)
