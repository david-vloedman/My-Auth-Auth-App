import { Box, CircularProgress } from '@material-ui/core'
import { useState } from 'react'
import fetchJson from '../../../lib/fetchJson'
import * as Styles from './CreateUserForm.styles'

const url = '/api/users/create-user'
/**
 * A form for creating a new user
 * @param {*} props
 */

export default function CreateUser(props) {
	const { toggleForms } = props

	const [form, setForm] = useState({
		firstName: {
			value: '',
			hasError: false,
			errorMsg: '',
		},
		lastName: {
			value: '',
			hasError: false,
			errorMsg: '',
		},
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
	})

	const onChange = (e) => {
		setForm({
			...form,
			[e.target.name]: {
				value: e.target.value,
				hasError: false,
				errorMsg: '',
			},
		})
	}

	const getFormValues = (target) =>
		Object.entries(target).reduce((obj, [k, v]) => {
			return {
				...obj,
				[k]: v.value,
			}
		}, {})

	const resetFormErrors = (target) => {
		const resetForm = Object.entries(target).reduce(
			(obj, [k, v]) => ({
				...obj,
				[k]: {
					value: v.value,
					hasError: false,
					errorMsg: '',
				},
			}),
			{}
		)
		setForm({...resetForm})
	}
	const onSubmit = async (e) => {
		e.preventDefault()
		resetFormErrors(form)
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
					...form[response.errorSource],
					hasError: true,
					errorMsg: response.errorMsg,
				},
			})
		}

		if (response.success) {
			toggleForms()
		}
	}

	return (
		<form autoComplete={'off'} noValidate>
			<Box display='flex' flexDirection='column'>
				<Styles.StyledTextField
					name='firstName'
					id='firstName'
					label='First Name'
					onChange={onChange}
					error={form.firstName?.hasError}
					helperText={form.firstName?.hasError ? form.firstName.errorMsg : ''}
				/>
				<Styles.StyledTextField
					name='lastName'
					id='lastName'
					label='Last Name'
					onChange={onChange}
					error={form.lastName?.hasError}
					helperText={form.lastName?.hasError ? form.lastName.errorMsg : ''}
				/>
				<Styles.StyledTextField
					name='userName'
					id='userName'
					label='User Name'
					onChange={onChange}
					error={form.userName?.hasError}
					helperText={form.userName?.hasError ? form.userName.errorMsg : ''}
					required
				/>
				<Styles.StyledTextField
					id='password'
					name='password'
					label='Password'
					type='password'
					onChange={onChange}
					error={form.password?.hasError}
					helperText={form.password?.hasError ? form.password.errorMsg : ''}
					required
				/>
				<Styles.StyledButton
					type='submit'
					onClick={onSubmit}
					onSubmit={onSubmit}
					variant='contained'
					color='secondary'
				>
					{form.loading ? <CircularProgress /> : 'Submit' }
				</Styles.StyledButton>
			</Box>
		</form>
	)
}
