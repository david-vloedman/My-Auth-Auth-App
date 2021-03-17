import SnackBar from './SnackBar'

describe('Snackbar tests', () => {
	it('should render without crashing', () => {
		shallow(<SnackBar />)
	})

  

	it("should accept the properties 'alertMessage', 'isOpen' & 'onClose'", () => {
		const message = 'Alert: this is a test'
		const isOpen = true
		const onClose = jest.fn()
		const wrapper = mount(
			<SnackBar alertMessage={message} isOpen={isOpen} onClose={onClose} />
		)

		expect(wrapper.props().alertMessage).toEqual(message)
		expect(wrapper.props().isOpen).toEqual(isOpen)
		expect(wrapper.props().onClose).toEqual(onClose)

    wrapper.unmount()
	})
})
