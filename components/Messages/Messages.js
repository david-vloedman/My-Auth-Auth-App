import * as Styles from './Messages.styles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button } from '@material-ui/core'

export default function Messages(props) {
	const {
		messages,
		onOpenMessage: openMessage,
		onDeleteMessage: deleteMessage,
	} = props

	if (!messages) return <div>No messages</div>

	const [viewMode, setViewMode] = useState({
		edit: false,
	})

	const toggleEditMode = () => {
		setViewMode({
			edit: !viewMode.edit,
		})
		resetSelectedState()
	}

	const [selectedMessages, setSelectedMessages] = useState([])

	const updateSelectedState = (newSelection) => {
		setSelectedMessages(newSelection.selectionModel)
	}

	const resetSelectedState = () => setSelectedMessages([])

	const deleteSelectedMessages = () => {
		selectedMessages?.map((slm) => deleteMessage(slm))
	}

  const columns = [
    {
      field: 'sender',
      flex: 1,
      renderHeader: (params) => <strong>From</strong>,
    },
    {
      field: 'subject',
      headerName: 'Subject',
      flex: 2,
      renderHeader: (params) => <strong>Subject</strong>,
    },
  ]
  

	return (
		<Styles.MainContainer>
			<Styles.ComponentHeader>
				<Typography variant='h6'>Messages</Typography>
				{viewMode.edit && selectedMessages?.length > 0 ? (
					<Button color={'secondary'} test-id='btn-delete-messages' onClick={deleteSelectedMessages}>
						Delete
					</Button>
				) : null}
				<Button onClick={toggleEditMode} >
					{viewMode.edit ? 'Done' : 'Edit'}
				</Button>
			</Styles.ComponentHeader>
			<Styles.MessageDataGrid
				rows={messages}
				columns={[...columns]}
				autoHeight={true}
				onRowClick={!viewMode.edit ? openMessage : null}
				onSelectionModelChange={updateSelectedState}
				selectionModel={[...selectedMessages]}
				disableSelectionOnClick={!viewMode.edit}
				checkboxSelection={viewMode.edit}
			/>
		</Styles.MainContainer>
	)
}

Messages.propTypes = {
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			subject: PropTypes.string,
			recipient: PropTypes.string.isRequired,
			sender: PropTypes.string.isRequired,
			body: PropTypes.string.isRequired,
		})
	),
	onOpenMessage: PropTypes.func,
	onReadMessage: PropTypes.func,
	onDeleteMessage: PropTypes.func,
}


