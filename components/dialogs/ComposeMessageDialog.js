import ComposeMessageForm from '../forms/ComposeMessage/ComposeMessageForm'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'

export default function ComposeMessageDialog(props) {
	const { dialogOpen, closeDialog, onSubmit } = props

	return (
		<Dialog open={dialogOpen} fullScreen TransitionComponent={Transition} onClose={closeDialog}>
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
					<Typography variant='h6'>
						Compose Message
					</Typography>
					<IconButton autoFocus color='inherit' onClick={onSubmit}>
						<SendIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<ComposeMessageForm {...props}/>
		</Dialog>
	)
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})