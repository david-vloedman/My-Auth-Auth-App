import withSession from '../../lib/withSession'
import Button from '@material-ui/core/Button'
import { useState } from 'react'
import fetchJson from '../../lib/fetchJson'

const url = '/api/users/'
export default function search(props) {
	const { user } = props

	const [users, setUsers] = useState()

	const onAddFriendClick = async (uid) => {
		// show all users
		try {
			const addFriendUrl = `/api/friends/addFriend/${uid}`
			const response = await fetchJson(addFriendUrl, {
				method: 'POST',
			})
      // response has message of success or error in it, decide where to show it
      console.log(response)
		} catch (error) {
			console.log(error)
		}
  }
  
  const showUsers = async () => {
		// retrieve list of all users

		try {
      const allUsers = await fetchJson(url)
      console.log(allUsers)
      setUsers([...allUsers.data.results])
      
      console.log(users)
		} catch (error) {
      console.log(error)
		}
	}

	const UserList = (props) => {
    const {userList} = props
		return (
			<ul>
				{userList.map((usr) => {
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
    <Button onClick={showUsers} variant='contained'>Show users</Button>
    {users ? <UserList userList={users} /> : null}
  </div>
  )
}

export const getServerSideProps = withSession(async function ({ req, res }) {

	const user = req.session.get('user')

	if (!user) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}

	return {
		props: {
			user,
		},
	}
})
