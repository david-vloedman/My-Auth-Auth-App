import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Link from 'next/link'

export default function MenuDrawer(props) {
	return (
		<Drawer anchor='left' {...props}>
			<List>
				<ListItem key='findFriends'>
					<Link href='#'>
						<a>
							<ListItemText primary='Find Friends' />
						</a>
					</Link>
				</ListItem>
				<Divider />

				<ListItem key='myFriends'>
					<Link href='/user/friends'>
						<a>
							<ListItemText primary='My Friends' />
						</a>
					</Link>
				</ListItem>
			</List>
		</Drawer>
	)
}
