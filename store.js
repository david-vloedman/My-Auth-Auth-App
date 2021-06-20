import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers'
import {persistStore} from 'redux-persist'

const composeEnhancers =
	(typeof window !== 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose

export function initStore(initialState) {
	const isClient = typeof window !== 'undefined'

	if (isClient) {
		const { persistReducer } = require('redux-persist')
		const storage = require('redux-persist/lib/storage').default

		const persistConfig = {
			key: 'root',
			storage,
		}

		const store = createStore(
			persistReducer(persistConfig, rootReducer),
			initialState,
			composeEnhancers(applyMiddleware(thunk))
		)

		store.__PERSISTOR = persistStore(store)

		return store
	}
	const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

	return store
	// return createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk)))
}
