import ConversationDisplay from '../components/ConversationDisplay/ConversationDisplay'
import ConversationHeading from '../components/ConversationHeading/ConversationHeading'
import SendMessageBox from '../components/input/SendMessageBox/SendMessageBox'
import Conversation from '../components/Conversation/Conversation'
import withSession from '../lib/withSession'
import getAppState from '../lib/helpers/getAppState'
import { useState } from 'react'
import axios from 'axios'

import { Box, Divider, Paper } from '@material-ui/core'
import { useSelector } from 'react-redux'

export default function testPage(props) {
	const userFriends = useSelector((state) => state.user.friends)
  const userConversations = useSelector((state) => state.user.conversations)

  const testConvo = {...userConversations[0], messages: [{
    body: 'hey',
    sentAt: new Date().toTimeString()
  }]}


  const sendMessage = async (data) => {
    console.log(`sending message to ${JSON.stringify(data)}`)

  }

  const createNewConversation = async (data) => {
    try{
      const response = await axios.post('/api/messages/conversation/create', data)
      console.log(response)

    } catch(error){
      console.error(error)
    }
  }


	return (
		<Box maxWidth={'450px'} m={'auto'}>
      <Paper>
      <Conversation conversation={testConvo} onSendMessage={sendMessage} createNewConversation={createNewConversation}/>
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
