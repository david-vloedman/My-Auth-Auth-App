import Drawer from '@material-ui/core/Drawer'
import {closeConversation} from 'lib/helpers/conversation/conversation'
import {connect} from 'react-redux'

export function ConversationDrawer({ isOpen, children, dispatch, updateIntervalId }) {

	return (
		<Drawer
			anchor={'bottom'}
			open={isOpen}
			onClose={() => closeConversation(dispatch, updateIntervalId)}
			PaperProps={{ style: { width: '350px', margin: 'auto'}}}
		>
			{children}
		</Drawer>
	)
}

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		isOpen: state.conversation.isOpen,
		updateIntervalId: state.conversation.updateIntervalId
	}
}

export default connect(mapStateToProps)(ConversationDrawer)
