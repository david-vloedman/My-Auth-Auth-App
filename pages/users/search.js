import withSession from '../../client_lib/withSession'
import SearchUsersContainer from '../../components/containers/SearchUsersContainer/SearchUsersContainer'

export default function search(props) {
	return <SearchUsersContainer />
}

export const getServerSideProps = withSession(async function ({ req }) {
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
