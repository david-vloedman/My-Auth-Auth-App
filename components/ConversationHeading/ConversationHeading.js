import { Box, Typography } from '@material-ui/core'

export default function ConversationHeading(props) {
	const { recipientName } = props

	return <Box p={'.5rem'}><Typography variant={'h5'}>Chat with: {recipientName}</Typography></Box>
}
