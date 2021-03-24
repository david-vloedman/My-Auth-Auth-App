import axios from 'axios'
import SendMessageBox from '../components/input/SendMessageBox/SendMessageBox'
import { useState } from 'react'
import ConversationDisplay from '../components/ConversationDisplay/ConversationDisplay'
import ConversationHeading from '../components/ConversationHeading/ConversationHeading'
import { Box, Divider, Paper } from '@material-ui/core'

export default function testPage(props) {
	const [form, setForm] = useState()

	const onChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const onClick = async (e) => {
		const response = await axios.post('/api/messages/conversation/create', {
			recipientId: 'test',
			message: 'hellow',
		})
	}
	// {text, date, author, align}

	const testMessages = [
		{
			text: 'Hey there',
			date: '3:23 PM',
			author: 'David',
			align: 'right',
		},
		{
			text: 'Hey there',
			date: '3:23 PM',
			author: 'David',
			align: 'left',
		},
		{
			text: 'Hey there',
			date: '3:23 PM',
			author: 'David',
			align: 'right',
		},
    {
			text: 'Hey there',
			date: '3:23 PM',
			author: 'David',
			align: 'right',
		},
    {
			text: 'Hey there',
			date: '3:23 PM',
			author: 'David',
			align: 'right',
		},
    {
			text: 'Hey there',
			date: '3:23 PM',
			author: 'David',
			align: 'right',
		},
    {
			text: 'Hey there',
			date: '3:23 PM',
			author: 'David',
			align: 'right',
		},
	]

	return (
		<Box maxWidth={'450px'} m={'auto'}>
			<Paper>
        <ConversationHeading isNewMessage={true} />
				<Box display='flex' flexDirection='column' p='1rem'>
					<ConversationDisplay chattingWith={'David'}/>
          <Divider />
          <Box pt={'1rem'}>
					<SendMessageBox onClick={onClick} onChange={onChange} />
          </Box>
				</Box>
			</Paper>
		</Box>
	)
}
