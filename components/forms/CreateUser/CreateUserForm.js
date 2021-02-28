import { useDispatch } from 'react-redux'
import { useState } from 'react'
import fetchJson from '../../../lib/fetchJson'
import { userCreated } from '../../../redux/reducers'
import * as Styles from './CreateUser.Formstyles'

const url = '/api/user/create-user'
/**
 * A form for creating a new user
 * @param {*} props
 */

export default function CreateUser(props) {
	const dispatch = useDispatch()

	const [form, setForm] = useState({})

	const onChange = (e) => {
		const key = e.target.name
		const value = e.target.value
		setForm({
			...form,
			[key]: value,
			hasError: false,
			errorMsg: undefined,
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
				errorMsg: response.errorMsg,
			})
		}

		if (response.success) {
			dispatch(userCreated())
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

			<Styles.StyledErrorMsg>{form.errorMsg}</Styles.StyledErrorMsg>
		</Styles.FormContainer>
	)
}
