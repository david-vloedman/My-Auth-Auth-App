import { Box, Divider } from '@material-ui/core'
import ConversationDisplay from 'components/ConversationDisplay/ConversationDisplay'
import ConversationHeading from 'components/ConversationHeading/ConversationHeading'
import SendMessageBox from 'components/input/SendMessageBox/SendMessageBox'

export default function Conversation() {

	return (
		<Box p={'1rem'} pt={'0'}>
			<ConversationHeading />
			<ConversationDisplay />
			<Divider />
			<Box mt={'1rem'}>
				<SendMessageBox />
			</Box>
		</Box>
	)
}
