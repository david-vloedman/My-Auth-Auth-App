import styled from 'styled-components'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { DataGrid } from '@material-ui/data-grid';



export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
`
export const MessageDataGrid = styled(DataGrid)`
	
`

export const GridContainer = styled.div`	
	flexGrow: 1;
`
export const ComponentHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: .5rem;
`

export const MessageList = styled(List)``

export const MessageListItem = styled(ListItem)``

export const MessageListItemIcon = styled(ListItemIcon)``

export const MessageListItemText = styled(ListItemText)``
