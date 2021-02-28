import Head from 'next/head'
import styled from 'styled-components'
import UserDashBoard from '../components/dashboard/UserDashboard'
import LoginFormContainer from '../components/containers/LoginForm/LoginFormContainer'
import {useSelector, useDispatch} from 'react-redux'
import withSession from '../lib/withSession'
import * as Actions from '../redux/reducers'

function Home(props) {

	const {user} = props

	return (
		<div className='container'>
			<Head>
				<title>Login</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				{user ? <UserDashBoard/> : <LoginFormContainer />}
			</main>

			<footer></footer>
		</div>
	)
}

export const getServerSideProps = withSession(async function({req, res}){
	const user = req.session.get('user')

	if(!user){
		return {
			redirect: '/login',
			permanent: false
		}
	}

	return {
		props: {user}
	}
})

export default Home

