import * as Styles from './UserDashboard.styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import LogoutButton from '../logout/LogoutButton'
import FriendsList from '../friends/friendsList/FriendsList'
import withSession from '../../lib/withSession'
import fetchJson from '../../lib/fetchJson'
import { useState } from 'react'
const url = '/api/users/'

const UserDashboard = (props) => {
	const { user } = props

	const [users, setUsers] = useState()

	const onAddFriendClick = async (uid) => {
		// show all users
		const addFriendUrl = `/api/friends/addFriend/${uid}`
		const response = await fetchJson(addFriendUrl)

		console.log(response)
	}

	const showAllUsers = () => {
		// display and retrieve list of all users
	}
	const getAllUsers = async () => {
		// retrieve list of all users

		try {
			const allUsers = await fetchJson(url)
			setUsers([...allUsers.data.results])
		} catch (error) {
      console.log(error)
		}
	}

	const UserList = ({ users }) => {
    console.log(users)
		return (
			<ul>
				{users?.map((usr) => {
					return(<li key={usr._id}>
						Name: {usr?.name} <br />
						UserName: {usr?.userName}
						<Button
							variant='contained'
							onClick={(e) => onAddFriendClick(usr._id)}
						>
							Add Friend
						</Button>
					</li>)
				})}
			</ul>
		)
	}

	return (
		<div>
			<div>Welcome, !</div>
			<LogoutButton />
			<Button variant='contained' onClick={(e) => getAllUsers()}>
				Add Friend
			</Button>
			{users ? <UserList users={users} /> : null}
			<div>
				<FriendsList />
			</div>
		</div>
	)
}

export default UserDashboard
