import { Box, Typography } from '@material-ui/core'
import TextField from '../input/TextField/TextField'

export default function ConversationHeading(props) {
	const { isNewMessage, recipientName, onSendToChange } = props

	return (
		<Box display={'inline-flex'} width={'100%'} p={'1rem'}>
			{isNewMessage ? (
				<TextField onChange={onSendToChange} name={''} label={'Send to'} fullWidth/>
			) : (
				<Typography variant={'subtitle1'}>{recipientName}</Typography>
			)}
		</Box>
	)
}
