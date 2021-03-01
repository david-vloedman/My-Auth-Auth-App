import UserDashBoard from '../components/dashboard/UserDashboard'
import withSession from '../lib/withSession'

export default function ({ props }) {
	return (
		<div>
			<UserDashBoard />
		</div>
	)
}

export const getServerSideProps = withSession(async function ({ req, res }) {
	const user = req.session.get('user')

	if (!user) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}

	return {
		props: {
			user,
		},
	}
})
