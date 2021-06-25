import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PersonAdd from '@material-ui/icons/PersonAdd'
import Person from '@material-ui/icons/Person'
import ExitToApp from '@material-ui/icons/ExitToApp'
import { logout } from 'client_lib/helpers/user/user'
import { connect } from 'react-redux'
import Link from 'next/link'
import {useRouter} from 'next/router'

export function MenuDrawer({ showDrawer, dispatch, toggleDrawer }) {

	const router = useRouter()

	return (
		<Drawer
			anchor='left'
			open={showDrawer}
			onClose={(e) => toggleDrawer(dispatch)}
		>
			<List onClick={(e) => toggleDrawer(dispatch)}>
				<Link href='/friends'>
					<ListItem key='myFriends' button>
						<ListItemIcon>
							<Person />
						</ListItemIcon>
						<ListItemText primary='My Friends' />
					</ListItem>
				</Link>
				<Link href='/myMatches'>
					<ListItem key='myMatches' button>
						<ListItemText primary='My Matches' />
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
					<ListItem key='logOut' button onClick={(e) => logout(dispatch, router)}>
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

const mapStateToProps = (state) => ({ showDrawer: state.layout.showDrawer })

export default connect(mapStateToProps)(MenuDrawer)
