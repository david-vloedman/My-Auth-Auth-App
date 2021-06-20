import Head from 'next/head'
import withSession from '../lib/withSession'
import { getUserState } from 'util/helpers/user/user'

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
		const userState = JSON.parse(JSON.stringify(await getUserState(sessionUser._id)))

		console.log(userState, 'GSSP')
		return {
			props: {
				...userState,
			},
		}
	} catch (error) {
		console.log(error)
		return {
			notFound: true,
		}
	}
})
