import withSession from '../../client_lib/withSession'
import SearchUsersContainer from '../../components/containers/SearchUsersContainer/SearchUsersContainer'
import { friendAdded } from '../../redux/reducers'
import { useDispatch } from 'react-redux'

export default function search(props) {
	const dispatch = useDispatch()

	const onAddFriend = (payload) => dispatch(friendAdded(payload))

	return <SearchUsersContainer onAddFriend={onAddFriend} />
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

	return {
		props: {
			sessionUser,
		},
	}
})
