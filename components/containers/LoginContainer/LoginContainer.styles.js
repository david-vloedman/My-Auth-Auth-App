import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

export const StyledMainContainer = styled.div`
  margin: auto;
  max-width: 350px;
  padding-top: 1rem;
`

export const StyledPaper = styled(Paper)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const FormBox = styled(Box)`
  display: flex;
`