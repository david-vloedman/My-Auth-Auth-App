import Message from './Message'

describe('Single message component tests', ()=> {
  const message1 = {
    sender: 'TestMan',
    recipient: '123123124',
    subject: 'Testing messages',
    body: 'This is a test message',
    createdAt: 1615934423695,
  }


  it('renders', () => {
    shallow(<Message />)
  })

  it('accepts a message object as a prop', () => {
    const component = mount(<Message message={message1} />)

    expect(component.props().message).toEqual(message1)
    component.unmount()
  })

  it('accepts dispatch references as props', () => {
    const onReply = jest.fn()
    const onDelete = jest.fn()
    const component = mount(<Message onReplyClick={onReply} onDeleteClick={onDelete} />)

    expect(component.props().onReplyClick).toEqual(onReply)
    expect(component.props().onDeleteClick).toEqual(onDelete)
    component.unmount()
  })


  it('fires dispatch references on correct button clicks', () => {
    const onReply = jest.fn()
    const onDelete = jest.fn()
    const component = mount(<Message onReplyClick={onReply} onDeleteClick={onDelete} />)

    const deleteBtn = component.find('button[data-test-id="deleteMessageBtn"]')
    const replyBtn = component.find('button[data-test-id="replyToMessageBtn"]')
    
    deleteBtn.simulate('click')
    replyBtn.simulate('click')

    expect(onReply.mock.calls.length).toEqual(1)
    expect(onDelete.mock.calls.length).toEqual(1)
    component.unmount()
  })

  it('renders the message data correctly', () => {
    const component = mount(<Message message={message1} />)

    const subject = component.find('[data-test-id="subject"]')
    const body = component.find('[data-test-id="body"]')
    const date = component.find('[data-test-id="date"]')
    const sender = component.find('[data-test-id="sender"]')

    expect(subject).toEqual(message1.subject)
    expect(body).toEqual(message1.body)
    expect(date).toEqual(message1.createdAt)
    expect(sender).toEqual(message1.sender)
    component.unmount()
  })
})