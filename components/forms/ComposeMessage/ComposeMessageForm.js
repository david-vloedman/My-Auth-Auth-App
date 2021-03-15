import { useState } from 'react'
import * as Styles from './ComposeMessage.styles'
import Typography from '@material-ui/core/Typography'

export default function ComposeMessageForm(props) {

	const {onChange} = props


	return (
		<Styles.FormContainer>
			<Typography variant='h6'>Compose Message</Typography>
			<form autoComplete={'false'} noValidate>
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
				
			</form>
		</Styles.FormContainer>
	)
}
