import { useRouter } from 'next/router'
import { useState } from 'react'
import fetchJson from '../../../lib/fetchJson'
import * as Styles from './LoginForm.styles'

import { loggedIn, logOut } from '../../../redux/reducers'
import { CircularProgress, FormControl } from '@material-ui/core'
/**
 * Login page for the application
 */

const url = '/api/session/login'

function LoginForm(props) {
	const router = useRouter()

	const [form, setForm] = useState({
		userName: {
			value: '',
			hasError: false,
			errorMsg: '',
		},
		password: {
			value: '',
			hasError: false,
			errorMsg: '',
		},
		loading: false,
	})

	const resetFormErrors = () =>
		setForm({
			...form,
			userName: {
				hasError: false,
				errorMsg: '',
				value: form.userName.value,
			},
			password: {
				hasError: false,
				errorMsg: '',
				value: form.password.value,
			},
		})

	const getFormValues = (form) => {
		return {
			userName: form.userName.value,
			password: form.password.value,
		}
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		resetFormErrors()
		try {
			setForm({
				...form,
				loading: true
			})
			const response = await fetchJson(url, {
				method: 'POST',
				body: JSON.stringify(getFormValues(form)),
				credentials: 'include',
			})
			setForm({
				...form,
				loading: false
			})
			if (response.hasError) {
				setForm({
					...form,
					[response.errorSource]: {
						hasError: true,
						errorMsg: response.errorMsg,
						value: form[response.errorSource].value,
					},
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
			[e.target.name]: {
				...form[e.target.name],
				value: e.target.value,
				hasError: false,
				errorMessage: '',
			},
		})
		console.log(form)
	}

	return (
		<>
			<Styles.StyledTextField
				error={form.userName.hasError}
				helperText={form.userName.hasError ? 'User not found' : ''}
				name='userName'
				id='userName'
				label='User Name'
				onChange={onChange}
			/>

			<Styles.StyledTextField
				error={form.password.hasError}
				helperText={form.password.hasError ? 'Invalid password' : ''}
				type='password'
				id='password'
				name='password'
				label='Password'
				onChange={onChange}
			/>

			<Styles.StyledButton
				type='button'
				onClick={(e) => onSubmit(e)}
				variant='contained'
				color={'secondary'}
			>
				{form.loading ? <CircularProgress /> : 'Sign-in'}
			</Styles.StyledButton>
		</>
	)
}

export default LoginForm
