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
	const sessionUser = req.session.get('user')

	if (!sessionUser) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}

	try {
		const appState = await getAppState(sessionUser._id)
		
		const json = JSON.stringify(appState)
		const jsonParsed = JSON.parse(json)
		return {
			props: {
				...jsonParsed

			}
		}
	} catch (error) {
		console.log(error)
		return {
			notFound: true,
		}
	}
})
