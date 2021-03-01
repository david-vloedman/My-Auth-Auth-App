import Head from 'next/head'
import styled from 'styled-components'
import UserDashBoard from '../components/dashboard/UserDashboard'
import withSession from '../lib/withSession'

export default function Home(props) {

	const {user} = props

	return (
		<div className='container'>
			<Head>
				<title>Dashboard</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				{user ? <UserDashBoard {...user}/> : null}
			</main>

			<footer></footer>
		</div>
	)
}

export const getServerSideProps = withSession(async function({req, res}){
	const user = req.session.get('user')

	if(!user){
		return {
			redirect: {
				destination: '/login',
				permanent: false
			},
			
		}
	}

	return {
		props: {
			user
		}
	}
})


