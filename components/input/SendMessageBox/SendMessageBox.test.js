import SendMessageBox from './SendMessageBox'

describe('SendMessageBox tests', () => {
	it('should render without crashing', () => {
		shallow(<SendMessageBox />)
	})

	it('should accept function props: onClick, onChange', () => {
		const onClick = jest.fn()
		const onChange = jest.fn()
		const wrapper = mount(
			<SendMessageBox onClick={onClick} onChange={onChange} />
		)

		const button = wrapper.find('button[data-test-id="sendBtn"]')
		const input = wrapper.find('input#messageField')
		expect(wrapper.props().onClick).toBe(onClick)
		expect(wrapper.props().onChange).toBe(onChange)
	})

	it('should call the given onClick function when the send button is clicked', () => {
		const onClick = jest.fn()
		const onChange = jest.fn()
		const wrapper = mount(
			<SendMessageBox onClick={onClick} onChange={onChange} />
		)

		const button = wrapper.find('button[data-test-id="sendBtn"]')
		
		button.simulate('click')

		expect(onClick.mock.calls.length).toBe(1)

		for (let i = 0; i < 10; i++) button.simulate('click')

		expect(onClick.mock.calls.length).toBe(11)
	})

	it('should call the onChange function with the value of the messageField', () => {
		const onClick = jest.fn()
		const onChange = jest.fn()
		const wrapper = mount(
			<SendMessageBox onClick={onClick} onChange={onChange} />
		)

		const button = wrapper.find('button[data-test-id="sendBtn"]')
		const input = wrapper.find('textarea#messageField')
		input.simulate('change', { name: 'messageField', value: 'Hello there' })

		expect(onChange.mock.calls.length).toBe(1)
			
		expect(onChange.mock.calls[0][0].value).toBe('Hello there')
	})

	
})
