import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

export const StyledTitle = styled(Typography)`
	flex-grow: 1;
`
export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

// export const StyledMainContainer = styled.div`
//   margin: auto;
//   max-width: 350px;
//   padding-top: 1rem;
// `

export const StyledMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: column wrap;
  width: 100%;
  margin: 1rem;
`