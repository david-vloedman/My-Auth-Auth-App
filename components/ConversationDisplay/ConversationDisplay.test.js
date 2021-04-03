import { ConversationDisplay } from './ConversationDisplay'

describe('It should render with or without messages',() => {
  it('renders without messages', () => {
    const wrapper = shallow(<ConversationDisplay />)
    expect(wrapper.find('ul[data-test-id="displayList"]').length).toEqual(0)
  })
  
  it('renders with messages', () => {
    const withParams = shallow(<ConversationDisplay messages={messageGroupNormal} />)
    expect(withParams.find('[data-test-id="displayList"]').children().length).toEqual(2)
  })
})

const messageGroupNormal = [
  {
    body: 'hello',
    sentAt: Date.now(),
    align: 'left',
  },
  {
    body: 'hey',
    sentAt: Date.now(),
    align: 'right',
  },
]