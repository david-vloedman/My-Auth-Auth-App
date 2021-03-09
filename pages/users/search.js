import withSession from '../../lib/withSession'
import SearchUsersContainer from '../../components/containers/SearchUsersContainer/SearchUsersContainer'
import getAppState from '../../lib/helpers/getAppState'

export default function search() {
	return <SearchUsersContainer />
}

export const getServerSideProps = withSession(async function ({ req }) {
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
			user: JSON.parse(appState), /// !!??
		},
	}
})
