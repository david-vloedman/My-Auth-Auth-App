import {
	Box,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core'

export default function MatchList({ matchList, OpenMatchButton, OpenMatch }) {
	return (
		<Box>
			<List>
				{matchList.map((m) => (
					<ListItem key={m._id}>
						<ListItemText primary={m.opponent} secondary={m.startedOn} />
						<ListItemSecondaryAction>
							<OpenMatch matchId={m._id} OpenMatchButton={OpenMatchButton} />
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
		</Box>
	)
}
