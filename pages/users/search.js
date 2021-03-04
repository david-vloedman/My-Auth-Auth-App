import withSession from '../../lib/withSession'
import Button from '@material-ui/core/Button'
import { useState } from 'react'
import fetchJson from '../../lib/fetchJson'
import SearchUserForm from '../../components/forms/SearchUsers/SearchUsersForm'
import getAppState from '../../lib/helpers/getAppState'

const url = '/api/users/'
export default function search(props) {
	const { user } = props

	const [results, setResults] = useState()

	

	const Results = (props) => {
    const { results } = props
    return <div>
      {JSON.stringify(results)}
    </div>
  }

	return (
  <div>
    <SearchUserForm setResults={setResults}/>
    { results ? <Results results={results} /> : null }
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
