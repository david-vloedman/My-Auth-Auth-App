import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PersonAdd from '@material-ui/icons/PersonAdd'
import Person from '@material-ui/icons/Person'
import Message from '@material-ui/icons/Message'
import Link from 'next/link'

export default function MenuDrawer(props) {

	const {toggleDrawer, open} = props

	return (
		<Drawer anchor='left' open={open} onClose={toggleDrawer}>
			<List onClick={toggleDrawer}>
				<ListItem button key='messages'>
					<ListItemIcon>
						<Message />
					</ListItemIcon>
					<Link href='/messages'>
						<ListItemText primary='Messages' />
					</Link>
				</ListItem>

				<ListItem key='myFriends' button>
					<ListItemIcon>
						<Person />
					</ListItemIcon>
					<Link href='/friends'>
						<ListItemText primary='My Friends' />
					</Link>
				</ListItem>

				<ListItem key='findFriends' button>
					<ListItemIcon>
						<PersonAdd />
					</ListItemIcon>
					<Link href='/users/search'>
						<ListItemText primary='Search Users' />
					</Link>
				</ListItem>
			</List>
		</Drawer>
	)
}
