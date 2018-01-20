import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './containers/App'
import configureStore from './store'
import './app.global.css'

const store = configureStore()

render(
	<AppContainer>
		<Root store={store} history={history} />
	</AppContainer>,
	document.getElementById('root')
)

if (module.hot) {
	module.hot.accept('./containers/App', () => {
		const NextRoot = require('./containers/App')
		render(
			<AppContainer>
				<NextRoot store={store} history={history} />
			</AppContainer>,
			document.getElementById('root')
		)
	})
}
