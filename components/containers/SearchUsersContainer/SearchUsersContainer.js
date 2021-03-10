import UserSearchResults from '../../userSearchResults/UserSearchResults'
import { useState } from 'react'
import SearchUserForm from '../../forms/SearchUsers/SearchUsersForm'
import * as Styles from './SearchUsersContainer.styles'
import Snackbar from '@material-ui/core/Snackbar'

export default function SearchUsersContainer(props) {
	const [results, setResults] = useState()
	const [alert, setAlert] = useState({
		open: false,
	})

	const setError = () => {
		setResults({ error: true })
	}

	const setLoading = () => {
		setResults({ loading: true })
	}

	const onClose = () => {
		setAlert({
			open: false,
		})
	}

	const WrappedSnackBar = () => (
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			message={alert.message}
			open={alert.open}
			onClose={onClose}
			color='green'
		/>
	)

	return (
		<Styles.MainContainer>
			<WrappedSnackBar />
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
					<UserSearchResults users={results.data} setAlert={setAlert} />
				) : null}
			</Styles.StyledPaper>
		</Styles.MainContainer>
	)
}
