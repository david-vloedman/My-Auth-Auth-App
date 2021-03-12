import Head from 'next/head'
import MessagesContainer from '../components/containers/MessagesContainer/MessagesContainer'

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
