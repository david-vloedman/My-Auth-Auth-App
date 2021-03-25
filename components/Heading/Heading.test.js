import Heading from './Heading'

describe('Test suite for the Heading component', () => {
	it('should render without crashing', () => {
		shallow(<Heading />)
	})

  it('should take a prop called variant or if one is not provided a default value of h6', () => {
    const wrapper = shallow(<Heading variant={'h2'}/>)

    expect(wrapper.exists('h2[data-test-id="heading"]')).toBe(true)

    wrapper.unmount()

    const wrapperNoProps = shallow(<Heading />)

    expect(wrapperNoProps.exists('h6[data-test-id="heading"]')).to.be(true)
    
    wrapperNoProps.unmount()

  })
})
