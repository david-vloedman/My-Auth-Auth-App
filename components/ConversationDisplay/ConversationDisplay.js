import {
	Avatar,
	Box,
	Divider,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core'

export default function ConversationDisplay(props) {
	const { messages } = props

	return (
		<>
			<Divider />
			<Box maxHeight={'70vh'} minHeight={'50vh'} overflow={'auto'}>
				<List>
					{messages?.map?.((msg) => (
						<ListItem key={Math.random()}>
							<ListItemText
								primary={msg.text}
								secondary={msg.date}
								align={msg.align}
							/>
						</ListItem>
					))}
				</List>
			</Box>
		</>
	)
}
