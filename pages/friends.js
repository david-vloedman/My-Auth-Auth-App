import Head from 'next/head'
import FriendsList from '../components/friends/friendsList/FriendsList'
import withSession from '../lib/withSession'

export default function Home(props) {

	const {user} = props
  console.log(user)
	return (
		<div className='container'>
			<Head>
				<title>Dashboard</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<FriendsList friendsList={user.friends} />
			</main>

			<footer></footer>
		</div>
	)
}

export const getServerSideProps = withSession(async function({req, res}){
	const user = req.session.get('user')
console.log(user)
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
