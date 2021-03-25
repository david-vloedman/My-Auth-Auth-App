import Drawer from '@material-ui/core/Drawer'

export default function ConversationDrawer(props) {
	const { isOpen, onClose, children } = props

	return (
		<Drawer
			anchor={'bottom'}
			open={isOpen}
			onClose={onClose}
			PaperProps={{ style: { width: '350px', margin: 'auto'}}}
		>
			{children}
		</Drawer>
	)
}
