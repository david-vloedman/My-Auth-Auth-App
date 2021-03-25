import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PersonAdd from '@material-ui/icons/PersonAdd'
import Person from '@material-ui/icons/Person'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Message from '@material-ui/icons/Message'
import Link from 'next/link'


export default function MenuDrawer(props) {
	const { toggleDrawer, logout, open } = props

	return (
		<Drawer anchor='left' open={open} onClose={toggleDrawer}>
			<List onClick={toggleDrawer}>
				<Link href='/messages'>
					<ListItem button key='messages'>
						<ListItemIcon>
							<Message />
						</ListItemIcon>
						<ListItemText primary='Messages' />
					</ListItem>
				</Link>

				<Link href='/friends'>
					<ListItem key='myFriends' button>
						<ListItemIcon>
							<Person />
						</ListItemIcon>
						<ListItemText primary='My Friends' />
					</ListItem>
				</Link>
				
				<Link href='/users/search'>
					<ListItem key='findFriends' button>
						<ListItemIcon>
							<PersonAdd />
						</ListItemIcon>
						<ListItemText primary='Search Users' />
					</ListItem>
				</Link>
				<Link href='/users/search'>
					<ListItem key='logOut' button onClick={logout}>
						<ListItemIcon>
							<ExitToApp />
						</ListItemIcon>
						<ListItemText primary='Log out' />
					</ListItem>
				</Link>
			</List>
		</Drawer>
	)
}
