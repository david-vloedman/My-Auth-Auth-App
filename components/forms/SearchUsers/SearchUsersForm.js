import { useState } from 'react'
import * as Styles from './SearchUsersForm.styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import Fuse from 'fuse.js'

export default function SearchUserForm(props) {
	const { setResults, setError } = props

	const [form, setForm] = useState({
		searchTerm: '',
	})

	const onChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const searchUsers = (searchTerm, data) => {
		const options = {
			includeScore: true,
			keys: ['userName', 'name'],
		}

		const fuse = new Fuse(data, options)

		return searchTerm ? fuse.search(searchTerm).map((i) => i.item) : data
	}

	const onSubmit = async (e) => {
		e.preventDefault()

		try {
			setForm({ ...form, loading: true })
			const allUsers = await axios.get('/api/users')
			const results = searchUsers(
				form['searchValue'] || '',
				allUsers.data.data.results
			)
			setForm({ ...form, loading: false })
			setResults({ data: [...results] })
		} catch (error) {
			console.log(error)
			setError(true)
		}
	}

	return (
		<>
			<Styles.StyledTextField
				name='searchValue'
				label='Username or Name'
				onChange={onChange}
			/>
			{form.loading ? (
				<Styles.LoadingIconContainer>
					<CircularProgress />
				</Styles.LoadingIconContainer>
			) : (
				<Button
					variant='contained'
					color='secondary'
					type='submit'
					onClick={onSubmit}
					onSubmit={onSubmit}
				>
					Search
				</Button>
			)}
		</>
	)
}
