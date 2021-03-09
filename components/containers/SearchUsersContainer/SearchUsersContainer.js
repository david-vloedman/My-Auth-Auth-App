import UserSearchResults from '../../userSearchResults/UserSearchResults'
import { useState } from 'react'
import SearchUserForm from '../../forms/SearchUsers/SearchUsersForm'
import * as Styles from './SearchUsersContainer.styles'

export default function SearchUsersContainer(props) {
	const [results, setResults] = useState()

	const setError = () => {
		setResults({ error: true })
	}

	const setLoading = () => {
		setResults({ loading: true })
	}

	return (
		<Styles.MainContainer>
			<Styles.StyledPaper>
				<SearchUserForm
					setResults={setResults}
					setError={setError}
					setLoading={setLoading}
				/>
				{results?.loading ? (
					<div>Loading...</div>
				) : results?.error ? (
					<div>Error</div>
				) : results?.data ? (
					<UserSearchResults users={results.data} />
				) : null}
			</Styles.StyledPaper>
		</Styles.MainContainer>
	)
}
