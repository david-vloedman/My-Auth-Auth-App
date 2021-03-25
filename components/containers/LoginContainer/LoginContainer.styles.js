import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

export const StyledMainContainer = styled.div`
  margin: auto;
  max-width: 350px;
  padding-top: 1rem;
`

export const StyledPaper = styled(Paper)`
  display: flex,
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  max-width: 350px;
  margin: auto;
`