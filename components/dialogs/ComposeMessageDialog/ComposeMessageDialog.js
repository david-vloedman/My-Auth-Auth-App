import ComposeMessageForm from '../../forms/ComposeMessage/ComposeMessageForm'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import * as Styles from './ComposeMessageDialog.styles'

export default function ComposeMessageDialog(props) {
	const { dialogOpen, closeDialog, onSubmit } = props

	return (
		<Styles.FlexContainer>
			<Dialog
				open={dialogOpen}
				fullScreen
				TransitionComponent={Transition}
				onClose={closeDialog}
			>
				<AppBar>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							onClick={closeDialog}
							aria-label='close'
						>
							<CloseIcon />
						</IconButton>
						<Styles.StyledTitle variant='h6'>
							Compose Message
						</Styles.StyledTitle>
						<IconButton autoFocus color='inherit' onClick={onSubmit}>
							<SendIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Styles.FormContainer>
					<ComposeMessageForm {...props} />
				</Styles.FormContainer>
			</Dialog>
		</Styles.FlexContainer>
	)
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})
