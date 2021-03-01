import Button from '@material-ui/core/Button'
import fetchJson from '../../lib/fetchJson'
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
		<Button onClick={onClick} variant='contained'>
			Logout
		</Button>
	)
}
