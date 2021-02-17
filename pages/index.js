import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'
import CreateUser from '../components/forms/CreateUser/CreateUser'
import createBoard, {alphabet} from '../chess/createBoard'

export default function Home({ isConnected }) {

	const board = createBoard(8, 8)

	return (
		<div className='container'>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<CreateUser />
				<ul>
					{board.map(row => <li key={Math.random()}>{JSON.stringify(row)}</li>)}
				</ul>
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
