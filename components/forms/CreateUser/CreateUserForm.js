import { useState } from 'react'
import { useRouter } from 'next/router'
// local imports
import fetchJson from '../../../lib/fetchJson'
import * as Styles from './CreateUserForm.styles'

const url = '/api/users/create-user'
/**
 * A form for creating a new user
 * @param {*} props
 */

export default function CreateUser(props) {
	const [form, setForm] = useState({})
	const { toggleForms } = props

	const onChange = (e) => {
		const key = e.target.name
		const value = e.target.value
		setForm({
			...form,
			[key]: value,
			hasError: false,
			message: undefined,
		})
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		const response = await fetchJson(url, {
			method: 'POST',
			body: JSON.stringify(form),
			credentials: 'include',
		})

		if (response.hasError) {
			setForm({
				...form,
				hasError: true,
				message: response.errorMsg,
			})
		}

		if (response.success) {
			setForm({
				hasError: false,
				message: 'Account created!',
			})

			toggleForms()
		}
	}

	return (
		<Styles.FormContainer>
			<Styles.StyledTextField
				name='firstName'
				label='First Name'
				onChange={onChange}
			/>
			<Styles.StyledTextField
				name='userName'
				label='User Name'
				onChange={onChange}
			/>
			<Styles.StyledTextField
				name='password'
				label='Password'
				type='password'
				onChange={onChange}
			/>
			<Styles.StyledButton
				type='button'
				onClick={(e) => onSubmit(e)}
				variant='contained'
			>
				Submit
			</Styles.StyledButton>

			{form.hasError ? (
				<Styles.StyledErrorMsg>{form.message}</Styles.StyledErrorMsg>
			) : (
				<div>{form.message}</div>
			)}
		</Styles.FormContainer>
	)
}
