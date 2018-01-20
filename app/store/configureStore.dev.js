/**
 * Redux store
 **/

'use strict'

import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'

const configureStore = (initialState) => {
	// Redux Configuration
	const middleware = []
	const enhancers = []

	// Create Store
	const store = createStore(
		rootReducer,
		initialState,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)

	if (module.hot) {
		module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers'))) // eslint-disable-line global-require
	}

	return store
}

export default configureStore
