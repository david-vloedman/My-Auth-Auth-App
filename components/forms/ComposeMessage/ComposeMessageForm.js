import * as Styles from './ComposeMessage.styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Avatar } from '@material-ui/core'

export default function ComposeMessageForm(props) {
	const { onChange, formData } = props
	
	return (
		<Styles.FormContainer>
			<List>
				<ListItem>
					<ListItemIcon>
						<Avatar />
					</ListItemIcon>
					<ListItemText primary={formData.recipientDisplay} />
				</ListItem>
			</List>
			<Styles.StyledTextField
				name='subject'
				label='Subject'
				onChange={onChange}
			/>
			<Styles.StyledTextField
				name='body'
				label='Message'
				rows={5}
				onChange={onChange}
				multiline
			/>
		</Styles.FormContainer>
	)
}
