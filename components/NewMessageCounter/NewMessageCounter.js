import { connect } from 'react-redux'
import MailIcon from '@material-ui/icons/Mail'
import Box from '@material-ui/core/Box'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import { useRouter } from 'next/router'

const NewMessageCounter = ({ count }) => {

	const router = useRouter()

	const onClick = () => {
		router.push('/friends')
	}

	return (
		<IconButton onClick={onClick}>
		<Badge badgeContent={count}>
			<MailIcon />
		</Badge>
		</IconButton>
	)
}

const mapStateToProps = (state) => ({ count: state.user.newMessageCount })

export default connect(mapStateToProps)(NewMessageCounter)
