import axios from 'axios'
import SendMessageBox from '../components/input/SendMessageBox/SendMessageBox'
import {useState} from 'react'

export default function testPage(props){


  const [form, setForm] = useState()

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onClick = async (e) => {
    const response = await axios.post('/api/messages/conversation/create', {
      recipientId: 'test',
      message: 'hellow'
    })
  }

  return <SendMessageBox onClick={onClick} onChange={onChange} />
}