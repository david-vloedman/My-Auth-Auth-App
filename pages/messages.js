import Head from 'next/head'
import MessagesContainer from '../components/containers/MessagesContainer/MessagesContainer'
import withSession from '../lib/withSession'
import getAppState from '../lib/helpers/getAppState'
import ComposeMessageForm from '../components/forms/ComposeMessage/ComposeMessageForm'

export default function messages(props) {
	return (
		<div>
			<Head>
				<title>Messages</title>
			</Head>
      <MessagesContainer />
			<ComposeMessageForm />
		</div>
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