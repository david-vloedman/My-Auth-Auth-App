import withSession from '../../lib/withSession'
import { useState } from 'react'
import SearchUserForm from '../../components/forms/SearchUsers/SearchUsersForm'
import getAppState from '../../lib/helpers/getAppState'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'

export default function search() {
	const [results, setResults] = useState()

	const Results = (props) => {
		const { results } = props
		return (
			<div>
				<List>
					{results?.map((friend) => {
						return (
							<ListItem key={Math.random()}>
								<ListItemAvatar>
									<Avatar>{/* add avatar images for users */}</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={friend.userName}
									secondary={friend.name ? friend.name : null}
								/>
								<ListItemSecondaryAction>
									<IconButton edge='end'><Add /></IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						)
					})}
				</List>
			</div>
		)
	}

	return (
		<div>
			<SearchUserForm setResults={setResults} />
			{results ? <Results results={[...results.data.results]} /> : null}
		</div>
	)
}

export const getServerSideProps = withSession(async function ({ req }) {
	const user = req.session.get('user')

	if (!user) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}

	const appState = await getAppState(user._id)

	return {
		props: {
			user: JSON.parse(appState), /// !!??
		},
	}
})
