import { Button } from '@material-ui/core'

export default function Message(props) {
	const { message, onReplyClick, onDeleteClick } = props



	return (
		<div>
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
