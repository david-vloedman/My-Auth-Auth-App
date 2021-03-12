import Messages from './Messages'

describe("Messages Component", () => {

  const testMessages = [
    {subject: 'testing', recipient: 'Joe', sender: 'Sarah', body: 'Hello Joe, this is a test message'},
    {recipient: 'Joe', sender: 'Sarah', body: 'Hello Joe, this is a test message'},
    {subject: 'testing', recipient: 'Joe', sender: 'Sarah'},
    {},
  ]

  it("renders without crashing", () => {
    shallow(<Messages />)
  })

  it("accepts message properties", ()=>{
    const component = mount(<Messages messages={testMessages} />)
    expect(component.props().messages).toEqual(testMessages)
  })

  
  
  it("renders the messages it is given", ()=>{
    const component = mount(<Messages messages={testMessages} />)

    testMessages.map(msg => {
      const bodyValue = component.find('div').text(msg.body)
      const recipientValue = component.find('div').text(msg.recipient)
      const senderValue = component.find('MessageListItem').text(msg.sender)
      const subjectValue = component.find('MessageListItem').text(msg.subject)

      expect(bodyValue).toEqual(msg.body)
      expect(recipientValue).toEqual(msg.recipient)
      expect(senderValue).toEqual(msg.sender)
      expect(subjectValue).toEqual(msg.subject)
    })
    
  })


})