import Head from 'next/head'
import withSession from '../lib/withSession'
import getAppState from '../lib/helpers/getAppState'

export default function Home(props) {

	return (
		<div className='container'>
			<Head>
				<title>Home</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main></main>

			<footer></footer>
		</div>
	)
}

export const getServerSideProps = withSession(async function ({ req, res }) {
	const user = req.session.get('user')
	
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
