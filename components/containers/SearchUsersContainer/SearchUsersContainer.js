import * as Styles from './SearchUsersContainer.styles'
import UserSearchResults from '../../UserSearchResults/UserSearchResults'
import SearchUserForm from '../../forms/SearchUsers/SearchUsersForm'
import Snackbar from '../../SnackBar/SnackBar'
import { useState } from 'react'
import Heading from '../../Heading/Heading'

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
		<>
			<WrappedSnackBar />
			<Styles.StyledPaper>
				<Heading text='Find Friends' component='h2' variant='h5' color={'black'} />
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
		</>
	)
}
