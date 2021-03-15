import * as Styles from './MessagesContainer.styles'
import Messages from '../../Messages/Messages'

export default function MessagesContainer(props) {
	const testMessages = [
		{
			id: '123',
			subject: 'testing',
			recipient: 'Joe',
			sender: 'Sarah',
			body: 'Hello Joe, this is a test message',
		},
		{
			id: '13214',
			recipient: 'Joe',
			sender: 'Sarah',
			body: 'Hello Joe, this is a test message',
		},
		{ id: '534', subject: 'testing', recipient: 'Joe', body:'', sender: 'Sarah' },
	]

	const {messages} = props

	const onRowClick = (param) => {
		const { row } = param
		console.log('open message: ', row.id)
		console.log('message read: ', row.id)
	}

	const onDeleteMessage = (param) => {
		console.log('delete message: ', param)
	}

	return (
		<Styles.StyledMainContainer>
			<Styles.StyledPaper>
				<Messages
					messages={testMessages}
					onOpenMessage={onRowClick}
					onDeleteMessage={onDeleteMessage}
				/>
			</Styles.StyledPaper>
		</Styles.StyledMainContainer>
	)
}
