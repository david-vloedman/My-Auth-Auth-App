import Dialog from '@material-ui/core/Dialog'
import Message from '../../Message/Message'
import Slide from '@material-ui/core/Slide'

export default function ViewMessageDialog(props){
  const {message, dialogOpen, dialogClose} = props
  return (
    <Dialog open={dialogOpen} onClose={dialogClose} TransitionComponent={Transition}>
      <Message message={message} />
    </Dialog>
  )
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})