import * as Styles from './Messages.styles'

export default function Messages(props){
  const {messages} = props
  
  return (
    <Styles.MainContainer>
      {messages?.map(msg => {
        <div>{JSON.stringify(msg)}</div>
      })}
    </Styles.MainContainer>
  )
}