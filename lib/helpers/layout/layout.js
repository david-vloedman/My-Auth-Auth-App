import { toggleDrawer as toggleDrawerActionCreator } from 'redux/reducers'

export const toggleDrawer = (dispatch) => {
	dispatch(toggleDrawerActionCreator())
}
