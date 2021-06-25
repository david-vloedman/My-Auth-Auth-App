import { Paper } from '@material-ui/core'
import withSession from 'client_lib/withSession'
import MatchList from 'components/MatchList/MatchList'
import { getUserChessMatches } from 'server_lib/helpers/user/user'
import { connectToDatabase } from 'server_lib/mongodb'
import OpenMatch from 'components/buttons/OpenMatch/OpenMatch'
import OpenMatchButton from 'components/buttons/OpenMatchButton/OpenMatchButton'

export default function myMatches({ matches }) {
	return (
		<Paper>
			<MatchList
				matchList={matches}
				OpenMatch={OpenMatch}
				OpenMatchButton={OpenMatchButton}
			/>
		</Paper>
	)
}

export const getServerSideProps = withSession(async ({ req, res }) => {
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
		const { db } = await connectToDatabase()
		// the object has to be parsed like this for NextJS to actually accept it
		const matches = JSON.parse(
			JSON.stringify(await getUserChessMatches(db, sessionUser._id))
		)

		return {
			props: {
				matches,
			},
		}
	} catch (error) {
		console.error(error)
	}
	return {}
})
