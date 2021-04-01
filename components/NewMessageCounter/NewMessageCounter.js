import { connect } from "react-redux"

export function NewMessageCounter({count}){
  return <div>

  </div>
}

const mapStateToProps = (state) => ({count: state.user.newMessageCount})

export default connect(mapStateToProps)(NewMessageCounter)