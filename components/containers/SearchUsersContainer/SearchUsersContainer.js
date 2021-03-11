import UserSearchResults from '../../UserSearchResults/UserSearchResults'
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

	const onClose = () => {
		setAlert({
			open: false,
		})
	}

	const WrappedSnackBar = () => (
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			autoHideDuration={3000}
			message={alert.message}
			open={alert.open}
			onClose={onClose}
			color='secondary'
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
