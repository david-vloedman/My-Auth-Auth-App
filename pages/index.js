import Head from 'next/head'
import styled from 'styled-components'
import LoginFormContainer from '../components/containers/LoginForm/LoginFormContainer'


export default function Home({props}) {

	return (
		<div className='container'>
			<Head>
				<title>Login</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<LoginFormContainer />
			</main>

			<footer></footer>
		</div>
	)
}


const StyledMainContainer = styled.div`
	max-width: 350px;
	padding:5px;
	margin: auto;
`
