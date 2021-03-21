import CreateUserForm from '../../forms/CreateUser/CreateUserForm'
import LoginForm from '../../forms/Login/LoginForm'
import Typography from '@material-ui/core/Typography'
import Heading from '../../Heading/Heading'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import * as Styles from './LoginContainer.styles'
import { useState } from 'react'
import { Button, Divider, Grid } from '@material-ui/core'

export default function LoginContainer({ props }) {
	const [visibility, setVisibility] = useState({
		login: true,
		create: false,
	})

	const toggleForms = () => {
		setVisibility({ login: !visibility.login, create: !visibility.create })
	}

	const Title = () => (
		<Heading
			variant='h5'
			component='h1'
			text={visibility.login ? 'Sign-in' : 'Create Account'}
			color={'primary'}
		/>
	)

	return (
		<Styles.StyledPaper>
			<Typography
				component='h2'
				variant='h6'
				color={'secondary'}
				align='center'
			>
				{visibility.login ? 'Login' : 'Create Account'}
			</Typography>
			<Box component='div' display='flex' flexDirection={'column'}>
				{visibility.login ? <LoginForm toggleForms={toggleForms} /> : null}
				{visibility.create ? (
					<CreateUserForm toggleForms={toggleForms} />
				) : null}
				<Divider />
				<Button href='#' onClick={toggleForms}>
					{visibility.login ? 'Create account' : 'Existing account sign-in'}
				</Button>
			</Box>
		</Styles.StyledPaper>
	)
}
