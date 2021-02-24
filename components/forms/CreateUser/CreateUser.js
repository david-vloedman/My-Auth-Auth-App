import { useSelector, useDispatch } from 'react-redux'
import {
	createUserFormChange,
	createUserFormError,
	createUserFormSubmit,
} from '../../../redux/reducers'
import * as Styles from './CreateUser.styles'

/**
 * A form for creating a new user
 * @param {*} props
 */
export default function CreateUser(props) {
	const form = useSelector((state) => state.createUserForm)
	const dispatch = useDispatch()

	const onChange = (e) => {
		const key = e.target.name
		const value = e.target.value
		dispatch(createUserFormChange({ key, value }))
	}

	const onSubmit = (e) => {
		e.preventDefault()
		dispatch(createUserFormSubmit())
	}

	return (
		<Styles.FormContainer>
			<Styles.StyledTextField name='firstName' label='First Name' onChange={onChange}/>
			<Styles.StyledTextField name='useName' label='User Name' onChange={onChange} />
			<Styles.StyledTextField name='password' label='Password' type='password' onChange={onChange} />
			<Styles.StyledButton type='button' onClick={(e) => onSubmit(e)} variant='contained'>
				Submit
			</Styles.StyledButton>
		</Styles.FormContainer>
	)
}
