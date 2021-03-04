import { useState } from 'react'
import fetchJson from '../../../lib/fetchJson'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const url = '/api/users/search'

export default function SearchUserForm(props) {

  const {setResults} = props

	const [form, setForm] = useState()

	const onChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmit = async (e) => {
    e.preventDefault()
    const results = await fetchJson(url, {
      method: 'POST',
      body: JSON.stringify(form)
    })

    setResults(results)
	}

	return (
		<StyledFormContainer>
      
			<StyledPaper elevation={3}>
      <Typography variant="h6">Search for a user</Typography>
				
					<StyledTextField name='searchValue' label='Username or Name' onChange={onChange} />
          <Button variant='contained' color='primary' onClick={onSubmit}>Search</Button>
        
			</StyledPaper>
      </StyledFormContainer>
		
	)
}

const StyledFormContainer = styled.div`
	max-width: 350px;
  margin: auto;
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
