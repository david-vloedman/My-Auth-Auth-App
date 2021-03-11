import withSession from '../../lib/withSession'
import SearchUsersContainer from '../../components/containers/SearchUsersContainer/SearchUsersContainer'
import getAppState from '../../lib/helpers/getAppState'

export default function search() {
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

	try {
		const appState = await getAppState(sessionUser._id)
		console.log(appState)
		const json = JSON.stringify(appState)
		const test = JSON.parse(json)
		return {
			props: {
				...test

			}
		}
	} catch (error) {
		console.log(error)
		return {
			notFound: true,
		}
	}
})
