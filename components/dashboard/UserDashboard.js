import * as Styles from './UserDashboard.styles'
import Button from '@material-ui/core/Button'
import LogoutButton from '../logout/LogoutButton'
import FriendsList from '../friends/friendsList/FriendsList'
import fetchJson from '../../lib/fetchJson'
import { useState } from 'react'

const url = '/api/users/'

const UserDashboard = (props) => {
	
	const user  = props

	console.log(user.friends)
	
	const [users, setUsers] = useState()

	const onAddFriendClick = async (uid) => {
		// show all users
		try{
			
			const addFriendUrl = `/api/friends/addFriend/${uid}`
			const response = await fetchJson(addFriendUrl, {
				method: 'POST'
			})
			// response has message of success or error in it, decide where to show it
		}catch(error){
			console.log(error)
		}
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
			<FriendsList friendsList={user.friends}/>
		</div>

	)
}

export default UserDashboard
