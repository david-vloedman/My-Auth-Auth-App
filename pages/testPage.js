import ConversationDisplay from '../components/ConversationDisplay/ConversationDisplay'
import ConversationHeading from '../components/ConversationHeading/ConversationHeading'
import SendMessageBox from '../components/input/SendMessageBox/SendMessageBox'
import withSession from '../lib/withSession'
import getAppState from '../lib/helpers/getAppState'
import { useState } from 'react'
import axios from 'axios'

import { Box, Divider, Paper } from '@material-ui/core'
import { useSelector } from 'react-redux'

export default function testPage(props) {
	const sessionUser = useSelector((state) => state.user)
	const [form, setForm] = useState()

	const onChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
		console.log(form)
	}

	const onSendToChange = (e, newValue) => {
    console.log(newValue)
		setForm({
			...form,
			sendTo: newValue,
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
				<ConversationHeading
					isNewMessage={true}
					friends={sessionUser.friends}
					onSendToChange={onSendToChange}
				/>
				<Box display='flex' flexDirection='column' p='1rem'>
					<ConversationDisplay chattingWith={'David'} />
					<Divider />
					<Box pt={'1rem'}>
						<SendMessageBox onClick={onClick} onChange={onChange} />
					</Box>
				</Box>
			</Paper>
		</Box>
	)
}
export const getServerSideProps = withSession(async function ({ req, res }) {
	const sessionUser = req.session.get('user')

	if (!sessionUser) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}

	try {
		const appState = await getAppState(sessionUser._id)

		const json = JSON.stringify(appState)
		const jsonParsed = JSON.parse(json)
		return {
			props: {
				...jsonParsed,
			},
		}
	} catch (error) {
		console.log(error)
		return {
			notFound: true,
		}
	}
})
