import Head from 'next/head'
import ChessContainer from 'components/containers/ChessContainer/ChessContainer'
import withSession from 'client_lib/withSession'
import { connectToDatabase } from 'server_lib/mongodb'
import { findMatchDocument, loadExistingGame } from 'server_lib/helpers/chess/chess'

export default function chess(props) {
	return (
		<div>
			<Head>
				<title>Chess</title>
			</Head>
			<ChessContainer />
		</div>
	)
}

export const getServerSideProps = withSession(async (req, res) => {

	try{
		const {mid} = req.params
		const {db} = await connectToDatabase()
		const matchState = loadExistingGame(db, mid)
		const sessionUser = req.session.get('user')
	
		if (!sessionUser || !mid) {
			return {
				redirect: {
					destination: '/login',
					permanent: false,
				},
			}
		}

		if(!matchState){
			return {
				notFound: true
			}
		}
	
		return {
			props: {
				sessionUser,
				matchState
			},
		}
	} catch(error){

	}

})