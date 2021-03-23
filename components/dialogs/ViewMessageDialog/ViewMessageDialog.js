import * as Styles from './ViewMessageDialog.styles'
import Dialog from '@material-ui/core/Dialog'
import Message from '../../Message/Message'
import Slide from '@material-ui/core/Slide'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ReplyIcon from '@material-ui/icons/Reply'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'

export default function ViewMessageDialog(props) {
	const {
		message,
		dialogOpen,
		dialogClose,
		onDeleteClick,
		onReplyClick,
	} = props
	
	return (
		<Styles.StyledMainContainer>
			<Dialog
				open={dialogOpen}
				onClose={dialogClose}
				fullScreen
				TransitionComponent={Transition}
			>
				<AppBar>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							onClick={dialogClose}
							aria-label='close'
						>
							<CloseIcon />
						</IconButton>
						<Styles.StyledTitle variant='h6'>View Message</Styles.StyledTitle>
						<IconButton
							onClick={() => onDeleteClick(message.id)}
							arian-label='delete'
							color='inherit'
						>
							<DeleteIcon />
						</IconButton>

						<IconButton
							onClick={() =>
								onReplyClick(message)
							}
							aria-label='reply'
							color='inherit'
						>
							<ReplyIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Message message={message} />
			</Dialog>
		</Styles.StyledMainContainer>
	)
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})
