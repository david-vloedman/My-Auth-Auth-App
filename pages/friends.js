import Head from 'next/head'
import withSession from '../client_lib/withSession'
import FriendsContainer from '../components/containers/FriendsContainer/FriendsContainer'
import SnackBar from 'components/SnackBar/SnackBar'


export default function friends(props) {
	return (
		<div>
			<Head>
				<title>My Friends</title>
			</Head>
			<SnackBar />
			<FriendsContainer />
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

	return {
		props: {
			sessionUser,
		},
	}
})
