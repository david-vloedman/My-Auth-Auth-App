import * as Styles from './MessagesContainer.styles'
import Messages from '../../Messages/Messages'

export default function MessagesContainer(props) {
	

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
					messages={messages}
					onOpenMessage={onRowClick}
					onDeleteMessage={onDeleteMessage}
				/>
			</Styles.StyledPaper>
		</Styles.StyledMainContainer>
	)
}
