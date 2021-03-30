import { Box, Typography } from '@material-ui/core'
import {connect} from 'react-redux'

function ConversationHeading(props) {
	const { recipientName } = props
	
	return <Box p={'.5rem'}><Typography variant={'h5'}>Chat with: {recipientName}</Typography></Box>
}

const mapStateToProps = (state) => ({recipientName: state.conversation.recipient.userName})

export default connect(mapStateToProps)(ConversationHeading)
