import LoginContainer from '../components/containers/LoginContainer/LoginContainer'
import Head from 'next/head'

export default function login(props) {
	return (
		<div>
			<Head>
				<title>Login</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<LoginContainer />
		</div>
	)
}
