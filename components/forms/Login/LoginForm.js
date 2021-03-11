import { useRouter } from 'next/router'
import { useState } from 'react'
import fetchJson from '../../../lib/fetchJson'
import * as Styles from './LoginForm.styles'
import Paper from '@material-ui/core/Paper'

import { loggedIn, logOut } from '../../../redux/reducers'
/**
 * Login page for the application
 */

const url = '/api/session/login'

function LoginForm(props) {
	const router = useRouter()

	const [form, setForm] = useState({
		userName: '',
		password: '',
		hasError: false,
		message: '',
	})

	const resetFormErrors = () => setForm({
		...form,
		hasError: false,
		message: ''
	})

	const onSubmit = async (e) => {
		e.preventDefault()
		resetFormErrors()
		try {
			const response = await fetchJson(url, {
				method: 'POST',
				body: JSON.stringify(form),
				credentials: 'include',
			})
			
			if (response.hasError) {
				setForm({
					...form,
					hasError: true,
					message: response.errorMsg
				})
			}

			if (response.loggedIn) {
				router.push('/')
			}
		} catch (error) {
			console.log(error)
		}
	}

	const onChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
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

			{form.hasError ? (
				<Styles.StyledErrorMsg>{form.message}</Styles.StyledErrorMsg>
			) : (
				<div>{form.message}</div>
			)}
			<Styles.StyledButton
				type='button'
				onClick={(e) => onSubmit(e)}
				variant='contained'
			>
				Sign-in
			</Styles.StyledButton>
		</Styles.FormContainer>
	)
}

export default LoginForm
