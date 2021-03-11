import withSession from '../../lib/withSession'
import SearchUsersContainer from '../../components/containers/SearchUsersContainer/SearchUsersContainer'
import getAppState from '../../lib/helpers/getAppState'
import {setUser, friendAdded}  from '../../redux/reducers'
import { useDispatch, useSelector } from 'react-redux'

export default function search(props) {
	const dispatch = useDispatch()

	const onAddFriend = (payload) => dispatch(friendAdded(payload))

	return <SearchUsersContainer onAddFriend={onAddFriend}/>
}

export const getServerSideProps = withSession(async function ({ req }) {
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

		const stringified = JSON.stringify(appState)
		const parsed = JSON.parse(stringified)
		return {
			props: {
				...parsed,
			},
		}
	} catch (error) {
		console.log(error)
		return {
			notFound: true,
		}
	}
})
