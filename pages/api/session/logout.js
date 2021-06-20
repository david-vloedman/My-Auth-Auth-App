import withSession from '../../../client_lib/withSession'
import * as Responses from '../../../client_lib/helpers/responses'

const logout = async (req, res) => {
	req.session.destroy()

  return Responses.ok(res, 'logged out')
}

export default withSession(logout)
