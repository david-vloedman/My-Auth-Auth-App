import * as Styles from './Message.styles'
import { Button } from '@material-ui/core'

export default function Message(props) {
	const { message, onReplyClick, onDeleteClick } = props

  if(!message) return <div>Error</div>

	return (
		<div>
      <Styles.StyledList>
        <Styles.StyledListItem>
          <Styles.StyledListItemText>
            From: <span data-test-id='sender'>{message.sender}</span>
          </Styles.StyledListItemText>
        </Styles.StyledListItem>
      
      <Styles.StyledListItem>
          <Styles.StyledListItemText>
            Subject: <span data-test-id='subject'>{message.subject ?? 'No subject'}</span>
          </Styles.StyledListItemText>
        </Styles.StyledListItem>
        <Styles.StyledListItem>
          <Styles.StyledListItemText>
            <span data-test-id='date'>{new Date(message.createdAt).toDateString()}</span>
            
            <span data-test-id='body'>{message.body}</span>
          </Styles.StyledListItemText>
        </Styles.StyledListItem>
        </Styles.StyledList>
			<ReplyToMessageBtn onReply={onReplyClick} />
			<DeleteMessageBtn onDelete={onDeleteClick} />
		</div>
	)
}

const ReplyToMessageBtn = ({ onReply }) => (
  <Button
    variant='contained'
    onClick={onReply}
    data-test-id={'replyToMessageBtn'}
  >
    Reply
  </Button>
)

const DeleteMessageBtn = ({ onDelete }) => (
  <Button
    variant='contained'
    onClick={onDelete}
    data-test-id={'deleteMessageBtn'}
  >
    Delete
  </Button>
)

Message.propTypes = {}
