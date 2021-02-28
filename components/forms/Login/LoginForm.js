import { useSelector, useDispatch } from 'react-redux'
import fetchJson from '../../../lib/fetchJson'
import * as Styles from './LoginForm.styles'

import { loggedIn, logOut } from '../../../redux/reducers'
/**
 * Login page for the application
 */

const url = '/api/session/login'

function LoginForm(props) {
	

	const formData = {
		userName: '',
		password: '',
	}

	const onSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await fetchJson(url, {
				method: 'POST',
				body: JSON.stringify(formData),
				credentials: 'include',
			})

			console.log(response)

			if (response.loggedIn) {
				
			}
		} catch (error) {
			console.log(error)
		}
	}

	const onChange = (e) => {
		formData[e.target.name] = e.target.value
	}

	return (
		<Styles.FormContainer>
			<Styles.StyledTextField
				name='userName'
				label='User Name'
				onChange={onChange}
			/>
			<Styles.StyledTextField
				type='password'
				name='password'
				label='Password'
				onChange={onChange}
			/>
			<Styles.StyledButton
				type='button'
				onClick={(e) => onSubmit(e)}
				variant='contained'
			>
				Login
			</Styles.StyledButton>
		</Styles.FormContainer>
	)
}

export default LoginForm
