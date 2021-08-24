import UserSearchResults from '../../UserSearchResults/UserSearchResults'
import SearchUserForm from '../../forms/SearchUsers/SearchUsersForm'
import Snackbar from '../../SnackBar/SnackBar'
import { useState } from 'react'
import { Box, Typography, Paper } from '@material-ui/core'

export default function SearchUsersContainer(props) {
	const [results, setResults] = useState()

	const setError = () => {
		setResults({ error: true })
	}


	return (
		<Box>
			
			<Paper>
				<Box display={'flex'} flexDirection={'column'} p={'1rem'}>
				<Typography component='h2' variant='h5'>Find Friends</Typography>
				<SearchUserForm
					setResults={setResults}
					setError={setError}
				/>
				{results?.data ? (
					<UserSearchResults
						users={results.data}
						{...props}
					/>
				) : null}
				</Box>
			</Paper>
		</Box>
	)
}
