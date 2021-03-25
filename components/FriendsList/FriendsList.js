import * as Styles from './FriendsList.styles'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import DeleteIcon from '@material-ui/icons/Delete'
import SendIcon from '@material-ui/icons/Send'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import {connect} from 'react-redux'
import {onOpenChat} from 'redux/conversation'

	
function FriendsList(props) {
	const { friendsList, onRemoveFriend, openNewMessageDialog,  existingConversations, dispatch  } = props

	const MainList = (props) => {
		const { friends,} = props

		return (
			<List>
				{friends?.map?.((friend) => {
					return (
						<ListItem key={Math.random()}>
							<ListItemAvatar>
								<Avatar>{/* add avatar images for users */}</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={friend.userName}
								secondary={friend.name ? friend.name : null}
							/>
							<ListItemSecondaryAction>
								<IconButton onClick={() => onRemoveFriend(friend._id)}>
									<DeleteIcon />
								</IconButton>
								<IconButton
									onClick={() =>
										onOpenChat(dispatch, friend._id, friend.userName, existingConversations)
									}
								>
									<SendIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					)
				})}
			</List>
		)
	}

	return <MainList friends={friendsList} />
}

const mapStateToProps = (state, ownProps) => ({existingConversations: state.user.conversations, ...ownProps})

export default connect(mapStateToProps)(FriendsList)