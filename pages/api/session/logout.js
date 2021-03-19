import withSession from '../../../lib/withSession'
import * as Responses from '../../../lib/helpers/responses'

const logout = async (req, res) => {
	req.session.destroy()

  return Responses.ok(res, 'logged out')
}

export default withSession(logout)
