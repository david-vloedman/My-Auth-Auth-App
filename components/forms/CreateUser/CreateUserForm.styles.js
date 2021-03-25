import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export const FormContainer = styled.div`
  padding: .5rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-around;
  flex-flow: column wrap;
  max-width: 350px;
`

export const StyledTextField = styled(TextField)`
  margin: .5rem !important;
`

export const StyledButton = styled(Button)`
  margin: .5rem !important;
`

export const StyledErrorMsg = styled.span`
  color: red;
`