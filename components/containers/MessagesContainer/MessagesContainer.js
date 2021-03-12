import * as Styles from './MessagesContainer.styles'
import Messages from '../../Messages/Messages'

export default function MessagesContainer(props) {
	const testMessages = [
    {subject: 'testing', recipient: 'Joe', sender: 'Sarah', body: 'Hello Joe, this is a test message'},
    {recipient: 'Joe', sender: 'Sarah', body: 'Hello Joe, this is a test message'},
    {subject: 'testing', recipient: 'Joe', sender: 'Sarah'},
    {},
  ]
	return (
		<Styles.StyledMainContainer>
			<Styles.StyledPaper>
				<Messages messages={testMessages}/>
			</Styles.StyledPaper>
		</Styles.StyledMainContainer>
	)
}
