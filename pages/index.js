import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'
import CreateUser from '../components/forms/CreateUser/CreateUser'

export default function Home({ isConnected }) {
	return (
		<div className='container'>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<CreateUser />
				{isConnected ? 'Connected' : 'Nope'}
			</main>

			<footer></footer>
		</div>
	)
}

export async function getServerSideProps(context) {
	const { client } = await connectToDatabase()

	const isConnected = client.isConnected()

	return {
		props: { isConnected },
	}
}
