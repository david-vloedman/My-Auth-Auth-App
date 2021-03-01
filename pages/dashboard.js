import UserDashBoard from '../components/dashboard/UserDashboard'

export default function({props}){
  const {user} = props

  return <div>
    <UserDashBoard {...props} />
  </div>
}