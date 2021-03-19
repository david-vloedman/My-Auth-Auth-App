import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: column wrap;
  max-width: 350px;
  margin: 1rem;
`

export const StyledTextField = styled(TextField)`
  margin: .5rem !important;
`

export const StyledButton = styled(Button)`
  margin: .5rem !important;
`