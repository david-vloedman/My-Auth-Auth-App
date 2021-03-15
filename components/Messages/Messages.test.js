import Messages from './Messages'

describe('Messages Component', () => {
	const testMessages = [
		{
			id: '23',
			subject: 'testing',
			recipient: 'Joe',
			sender: 'Sarah',
			body: 'Hello Joe, this is a test message',
		},
		{
			id: '12',
			recipient: 'Joe',
			sender: 'Sarah',
			body: 'Hello Joe, this is a test message',
		},
		{
			id: '45',
			subject: 'testing',
			recipient: 'Joe',
			sender: 'Sarah',
			body: 'helloooo',
		},
	]

	it('renders without crashing', () => {
		shallow(<Messages />)
	})

	it('accepts message properties', () => {
		const component = mount(<Messages messages={testMessages} />)
		expect(component.props().messages).toEqual(testMessages)
	})

	it('accepts setter functions', () => {
		const onOpenMessage = jest.fn()
		const onReadMessage = jest.fn()
		const onDeleteMessage = jest.fn()
		
		const component = mount(
			<Messages
				messages={testMessages}
				onOpenMessage={onOpenMessage}
				onDeleteMessage={onDeleteMessage}
				onReadMessage={onReadMessage}
			/>
		)

		expect(component.props().onDeleteMessage).toEqual(onDeleteMessage)
		expect(component.props().onReadMessage).toEqual(onReadMessage)
		expect(component.props().onOpenMessage).toEqual(onOpenMessage)
	})

})
