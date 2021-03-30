import {
	Avatar,
	Box,
	Divider,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { useEffect } from 'react'

function ConversationDisplay({messages}) {

	useEffect(() => {
		const displayContainer = document.getElementById('displayContainer')
		displayContainer.scrollTop = displayContainer.scrollHeight;
	})


	return (
		<>
			<Divider />
			<Box maxHeight={'70vh'} minHeight={'50vh'} id={'displayContainer'} overflow={'auto'}>
				<List dense={true}>
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
