import * as Styles from './MessagesContainer.styles'
import Messages from '../../Messages/Messages'

export default function MessagesContainer(props) {
	return (
		<Styles.StyledMainContainer>
			<Styles.StyledPaper>
				<Messages />
			</Styles.StyledPaper>
		</Styles.StyledMainContainer>
	)
}
