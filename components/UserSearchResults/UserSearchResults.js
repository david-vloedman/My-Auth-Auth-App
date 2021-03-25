import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import AddUserButton from '../buttons/AddUserButton/AddUserButton'

export default function UserSearchResults(props) {
	const { users } = props
  
	return (
		<div>
			<List>{users?.map?.(user => (<UserListItem user={user} key={user._id} {...props}/>))}</List>
		</div>
	)
}

function UserListItem(props) {
	const { user, setAlert } = props

	return (
		<ListItem>
			<ListItemAvatar>
				<Avatar />
			</ListItemAvatar>
			<ListItemText
				primary={user?.userName}
				secondary={user?.name ? user.name : null}
			/>
			<ListItemSecondaryAction>
				<AddUserButton user={user} setAlert={setAlert} {...props}/>
			</ListItemSecondaryAction>
		</ListItem>
	)
}
