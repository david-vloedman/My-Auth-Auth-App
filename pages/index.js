import Head from 'next/head'
import withSession from '../lib/withSession'
import getAppState from '../lib/helpers/getAppState'

export default function Home(props) {
	const { user } = props

	console.log(user)

	return (
		<div className='container'>
			<Head>
				<title>Dashboard</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main></main>

			<footer></footer>
		</div>
	)
}

export const getServerSideProps = withSession(async function ({ req, res }) {
	const user = req.session.get('user')
	console.log(user)
	if (!user) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}

	const appState = await getAppState(user._id)
	
	return {
		props: {
			user:{...JSON.parse(appState)}, /// !!??
		},
	}
})
