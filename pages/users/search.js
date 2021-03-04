import withSession from '../../lib/withSession'
import Button from '@material-ui/core/Button'
import { useState } from 'react'
import fetchJson from '../../lib/fetchJson'
import SearchUserForm from '../../components/forms/SearchUsers/SearchUsersForm'
import getAppState from '../../lib/helpers/getAppState'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

const url = '/api/users/'
export default function search(props) {
	const { user } = props

	const [results, setResults] = useState()

	

	const Results = (props) => {
    console.log(props)
    const { results } = props
    return <div>
      		<List>
				<ListSubheader component='div' disableSticky={true}>Friends</ListSubheader>
				{results?.map((friend) => {
					return (
						<ListItem key={Math.random()}>
              <ListItemAvatar>
                <Avatar>
                {/* add avatar images for users */}
                </Avatar>
              </ListItemAvatar>
							<ListItemText primary={friend.userName} secondary={friend.name ? friend.name : null} />
              <ListItemSecondaryAction>
                <IconButton edge='end'>
                  
                </IconButton>
              </ListItemSecondaryAction>
							
						</ListItem>
					)
				})}
			</List>
    </div>
  }
  console.log(results)
	return (
  <div>
    <SearchUserForm setResults={setResults}/>
    { results ? <Results results={[...results.data.results]} /> : null }
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
  
  const appState = await getAppState(user._id)

	return {
		props: {
			user: JSON.parse(appState), /// !!??
		},
	}
})
