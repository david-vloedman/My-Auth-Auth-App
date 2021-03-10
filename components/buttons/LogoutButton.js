import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import {useDispatch} from 'react-redux'
import * as Actions from '../../redux/reducers'

const url = '/api/session/logout'

export default function LogoutButton(props) {
	const router = useRouter()
	const dispatch = useDispatch()
	const onClick = async () => {
		try {
			const response = await fetch(url, {
				method: 'GET',
			})
			dispatch(Actions.toggleLoggedIn())
			console.log(response)
		} catch(error){
			console.log(error)
		}
		

		router.push('/login')
	}

	return (
		<Button onClick={onClick} color='inherit'>
			Logout
		</Button>
	)
}
