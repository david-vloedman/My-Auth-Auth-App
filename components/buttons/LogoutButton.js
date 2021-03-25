import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'

const url = '/api/session/logout'

export default function LogoutButton(props) {
	const router = useRouter()

	const onClick = async () => {
		const response = await fetch(url, {
			method: 'GET',
		})

		router.push('/')
	}

	return (
		<Button onClick={onClick} color='inherit'>
			Logout
		</Button>
	)
}
