import {
	gameUpdated,
	updateLoopStarted,
	updateLoopTerminated,
} from 'redux/chessSlice/chessSlice'

export const startMatchPolling = (dispatch, requestUpdate, mid) => {
	try {
		const intervalId = setInterval(async () => {
      
			const response = await requestUpdate(dispatch, mid)

			if (response) {
				// dispatch(gameUpdated())
				
			}
		}, 2000)
    dispatch(updateLoopStarted(intervalId))
	} catch (error) {
    console.error(error)
    clearInterval(intervalId)
    dispatch(updateLoopTerminated())
  }
}

export const endMatchPolling = (dispatch, intervalId) => {
	clearInterval(intervalId)
	dispatch(updateLoopTerminated)
}
