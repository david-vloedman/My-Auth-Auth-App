import LoginFormContainer from '../components/containers/LoginForm/LoginFormContainer'
import Head from 'next/head'

export default function login() {
	return (
		<div>
			<Head>
				<title>Login</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<LoginFormContainer />
		</div>
	)
}
