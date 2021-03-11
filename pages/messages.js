import Head from 'next/head'
import MessagesContainer from '../components/Messages/Messages'

export default function messages(props) {
	return (
		<div>
			<Head>
				<title>Messages</title>
			</Head>
      <MessagesContainer />
		</div>
	)
}
