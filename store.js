import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './redux/reducers'


const composeEnhancers =
	(typeof window !== 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose


export function initStore(initialState) {
	return createStore(reducers,{...initialState}, composeEnhancers(applyMiddleware(thunk)))
}
