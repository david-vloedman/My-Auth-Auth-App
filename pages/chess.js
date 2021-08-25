import Head from 'next/head'
import ChessContainer from 'components/containers/ChessContainer/ChessContainer'
import withSession from 'client_lib/withSession'
import { connectToDatabase } from 'server_lib/mongodb'
import { loadExistingGame } from 'server_lib/helpers/chess/chess'
import { connect } from 'react-redux'
import { loadMatchIntoState } from 'client_lib/helpers/chess/chess'
import { useEffect } from 'react'

export function chess({ dispatch, matchState }) {
	useEffect(() => loadMatchIntoState(dispatch, matchState))

	return (
		<div>
			<Head>
				<title>Chess</title>
			</Head>
			<ChessContainer />
		</div>
	)
}

export default connect(() => ({}))(chess)

export const getServerSideProps = withSession(async ({ req, query }) => {

	const sessionUser = req.session.get('user')

	if(!sessionUser){
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		}
	}

	try {
		const { mid } = query
		const { db } = await connectToDatabase()

		// for some reason the JSON obj must be stringified and then parsed
		// to avoid NextJS complaining about object format
		const matchState = JSON.parse(
			JSON.stringify(await loadExistingGame(db, mid, sessionUser._id))
		)

		if (!sessionUser || !mid) {
			return {
				redirect: {
					destination: '/login',
					permanent: false,
				},
			}
		}

		if (!matchState) {
			return {
				notFound: true,
			}
		}

		return {
			props: {
				sessionUser,
				matchState,
			},
		}
	} catch (error) {
		console.error(error)
		return {
			notFound: true,
		}
	}
})
