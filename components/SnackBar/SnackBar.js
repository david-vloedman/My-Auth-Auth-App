import Snackbar from '@material-ui/core/Snackbar'

export default function SnackBar(props){

  const {alertMessage, isOpen, onClose } = props

  return(
  <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    autoHideDuration={3000}
    message={alertMessage}
    open={isOpen}
    onClose={onClose}
    color='secondary'
  />)

}