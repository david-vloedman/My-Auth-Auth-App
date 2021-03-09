import withSession from '../../lib/withSession'
import { useState } from 'react'
import SearchUsersContainer from '../../components/containers/SearchUsersContainer/SearchUsersContainer'
import getAppState from '../../lib/helpers/getAppState'
import UserSearchResults from '../../components/userSearchResults/UserSearchResults'
import Paper from '@material-ui/core/Paper'

export default function search() {
	const [results, setResults] = useState()

	const setError = () => {
		setResults({ error: true })
	}

	const setLoading = () => {
		setResults({ loading: true })
	}

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
