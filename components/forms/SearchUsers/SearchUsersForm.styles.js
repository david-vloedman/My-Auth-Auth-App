import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

export const StyledFormContainer = styled.div`
	max-width: 350px;
	margin: auto;
	padding: 1rem;
	display: flex;
	flex-flow: column wrap;
	justify-content: space-around;
`

export const StyledTextField = styled(TextField)`
	margin: 0.5rem !important;
`

export const LoadingIconContainer = styled.div`
  display: flex;
  justify-content: center;
`