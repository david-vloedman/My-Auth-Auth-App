import { useSelector, useDispatch } from 'react-redux'
import fetchJson from '../../../lib/fetchJson'
import * as Styles from './LoginForm.styles'
import {loggedIn, loggedOut} from '../../../redux/reducers'
/**
 * Login page for the application
 */

const url = '/api/session/login'

export default function LoginForm(props) {
	const dispatch = useDispatch()

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
      
      if(response.loggedIn){
        dispatch(loggedIn(response.user))
      }
			console.log(response)
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
