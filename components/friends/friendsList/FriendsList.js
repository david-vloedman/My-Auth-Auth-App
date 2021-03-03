import Button from '@material-ui/core/Button'
import * as Styles from './FriendsList.styles'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

export default function FriendsList(props) {
	const { friendsList } = props

	const getUserList = async () => {
		/* get all users */
	}
	const addFriend = async (uid) => {
		/* add friend */
	}
	const removeFriend = async (uid) => {
		/* remove friend */
	}

	const MainList = (props) => {
		const { friends } = props

		return (
			<List>
				<ListSubheader component='div' disableSticky={true}>Friends</ListSubheader>
				{friends.map((friend) => {
					return (
						<ListItem key={Math.random()}>
              <ListItemAvatar>
                <Avatar>
                {/* add avatar images for users */}
                </Avatar>
              </ListItemAvatar>
							<ListItemText primary={friend.userName} secondary={friend.name ? friend.name : null} />
              <ListItemSecondaryAction>
                <IconButton edge='end'>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
							
						</ListItem>
					)
				})}
			</List>
		)
	}

	console.log(friendsList)
	return (
		<Styles.Container>
      <Paper elevation={3}>
      
			<MainList friends={friendsList} />
      </Paper>
		</Styles.Container>
	)
}
