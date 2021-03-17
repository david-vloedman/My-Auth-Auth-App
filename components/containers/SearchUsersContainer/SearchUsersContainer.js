import * as Styles from './SearchUsersContainer.styles'
import UserSearchResults from '../../UserSearchResults/UserSearchResults'
import SearchUserForm from '../../forms/SearchUsers/SearchUsersForm'
import Snackbar from '../../SnackBar/SnackBar'
import { useState } from 'react'

export default function SearchUsersContainer(props) {
	const [results, setResults] = useState()
	const [alert, setAlert] = useState({
		open: false,
	})

	const setError = () => {
		setResults({ error: true })
	}

	const onClose = () => {
		setAlert({
			open: false,
		})
	}

	const WrappedSnackBar = () => (
		<Snackbar
			alertMessage={alert.message}
			isOpen={alert.open}
			onClose={onClose}
		/>
	)

	return (
		<Styles.MainContainer>
			<WrappedSnackBar />
			<Styles.StyledPaper>
				<SearchUserForm
					setResults={setResults}
					setError={setError}
				/>
				{results?.data ? (
					<UserSearchResults
						users={results.data}
						setAlert={setAlert}
						{...props}
					/>
				) : null}
			</Styles.StyledPaper>
		</Styles.MainContainer>
	)
}
