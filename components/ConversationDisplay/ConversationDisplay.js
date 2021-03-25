import {
	Avatar,
	Box,
	Divider,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core'
import { connect } from 'react-redux'

function ConversationDisplay({messages}) {
  
	return (
		<>
			<Divider />
			<Box maxHeight={'70vh'} minHeight={'50vh'} overflow={'auto'}>
				<List >
					{messages?.map?.((msg) => (
						<ListItem key={Math.random()}>
							<ListItemText
								primary={msg.body}
								secondary={msg.sentAt}
								align={msg.align}
							/>
						</ListItem>
					))}
				</List>
			</Box>
		</>
	)
}

const mapStateToProps = (state) => ({messages: state.conversation.messages})

export default connect(mapStateToProps)(ConversationDisplay)
