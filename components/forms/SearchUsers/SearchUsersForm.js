import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Fuse from 'fuse.js'

export default function SearchUserForm(props) {
	const { setResults, setLoading, setError } = props

	const [form, setForm] = useState()

	const onChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const searchUsers = (searchTerm, data) => {
		const options = {
			includeScore: true,
			keys: ['userName', 'name']
		}

		console.log(data)
		const fuse = new Fuse(data, options)

		const result = fuse.search(searchTerm)

		return result.map(i => i.item)
		
	}


	const onSubmit = async (e) => {
		e.preventDefault()

		try {
			setLoading(true)
			const allUsers = await axios.get('/api/users')
			const results = searchUsers(form['searchValue'], allUsers.data.data.results)
			setResults({data:[...results]})
		} catch (error) {
			console.log(error)
			setError(true)
		}
	}

	return (
		<StyledFormContainer>
			
				<Typography variant='h6'>Search for a user</Typography>

				<StyledTextField
					name='searchValue'
					label='Username or Name'
					onChange={onChange}
				/>
				<Button variant='contained' color='primary' type='submit' onClick={onSubmit}>
					Search
				</Button>
			
		</StyledFormContainer>
	)
}

const StyledFormContainer = styled.div`
	max-width: 350px;
	margin: auto;
	padding: 1rem;
	display: flex;
	flex-flow: column wrap;
	justify-content: space-around;
`

const StyledPaper = styled(Paper)`
	padding: 1rem;
	display: flex;
	flex-flow: column wrap;
	justify-content: space-around;
`

const StyledTextField = styled(TextField)`
	margin: 0.5rem !important;
`
