import { Box, Typography } from '@material-ui/core'
import TextField from '../input/TextField/TextField'
import SendToControl from '../SendToControl/SendToControl'

export default function ConversationHeading(props) {
	const { isNewMessage, recipientName, onSendToChange, friends } = props

	return (
		<Box display={'inline-flex'} width={'100%'} p={'1rem'}>
			{isNewMessage ? (
				<SendToControl onChange={onSendToChange} options={friends} fullWidth/>
			) : (
				<Typography variant={'subtitle1'}>{recipientName}</Typography>
			)}
		</Box>
	)
}


