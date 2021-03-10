import CreateUserForm from '../../forms/CreateUser/CreateUserForm'
import LoginForm from '../../forms/Login/LoginForm'
import Typography from '@material-ui/core/Typography'
import * as Styles from './LoginContainer.styles'
import { useState } from 'react'

export default function LoginContainer({ props }) {
	const [visibility, setVisibility] = useState({
		login: true,
		create: false,
	})

	const toggleForms = () => {
		setVisibility({ login: !visibility.login, create: !visibility.create })
	}
	
	const Title = () => <Typography variant='h6'>{visibility.login ? 'Sign-in' : 'Create Account'}</Typography>

	return (
		<Styles.StyledMainContainer>
			<Styles.StyledPaper>
				<Title />
				{visibility.login ?(<LoginForm toggleForms={toggleForms} /> ): null}
				{visibility.create ? (
					<CreateUserForm toggleForms={toggleForms} />
				) : null}
				<a href='#' onClick={toggleForms}>
					{visibility.login ? 'Create account' : 'Existing account sign-in'}
				</a>
			</Styles.StyledPaper>
		</Styles.StyledMainContainer>
	)
}
