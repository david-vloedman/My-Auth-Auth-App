import * as Styles from './FriendsList.styles'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

export default function FriendsList(props) {
	
	const { friendsList, onRemoveFriend, openNewMessageDialog } = props
	
	const MainList = (props) => {
		const { friends } = props

		return (
			<List>
				{friends?.map?.((friend) => {
					return (
						<ListItem key={Math.random()}>
              <ListItemAvatar>
                <Avatar>
                {/* add avatar images for users */}
                </Avatar>
              </ListItemAvatar>
							<ListItemText primary={friend.userName} secondary={friend.name ? friend.name : null} />
              <ListItemSecondaryAction>
                {/* <RemoveUserButton friend={friend} onRemoveFriend={onRemoveFriend} /> */}
								<Button onClick={() => openNewMessageDialog(friend._id, friend.userName)}>Send</Button>
              </ListItemSecondaryAction>
						</ListItem>
					)
				})}
			</List>
		)
	}
	
	return (
		<Styles.Container>
      <Paper elevation={3}>
				<Typography variant='h6'>Friends</Typography>
			<MainList friends={friendsList} />
      </Paper>
		</Styles.Container>
	)
}
