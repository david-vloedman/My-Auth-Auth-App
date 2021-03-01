import CreateUserForm from '../../forms/CreateUser/CreateUserForm'
import LoginForm from '../../forms/Login/LoginForm'
import * as Styles from './LoginFormContainer.styles'
import { useState } from 'react'


export default function LoginFormContainer({ props }) {
	const [visibility, setVisibility] = useState({
		login: true,
		create: false,
	})

	const toggleForms = () => {
		setVisibility({ login: !visibility.login, create: !visibility.create })
	}
	
	return (
		<Styles.StyledMainContainer>
			{visibility.login ? <LoginForm toggleForms={toggleForms}/> : null}
			{visibility.create ? <CreateUserForm toggleForms={toggleForms}/> : null}
			<a href='#' onClick={toggleForms}>
				{visibility.login ? 'Create account' : 'Existing account sign-in'}
			</a>
		</Styles.StyledMainContainer>
	)
}
