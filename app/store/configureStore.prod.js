import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()
const router = routerMiddleware(history)
const enhancer = applyMiddleware(router)

function configureStore(initialState) {
	return createStore(rootReducer, initialState)
}

export default { configureStore, history }
