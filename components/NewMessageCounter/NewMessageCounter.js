import { connect } from 'react-redux'
import MailIcon from '@material-ui/icons/Mail'
import Box from '@material-ui/core/Box'
import Badge from '@material-ui/core/Badge'

const NewMessageCounter = ({ count }) => {
	return (
		<Badge badgeContent={count}>
			<MailIcon />
		</Badge>
	)
}

const mapStateToProps = (state) => ({ count: state.user.newMessageCount })

export default connect(mapStateToProps)(NewMessageCounter)
