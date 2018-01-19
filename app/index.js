/**
 * Starting point - index.js
 **/

'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './containers/App'
import './app.global.css'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import { grey, amber, red } from 'material-ui/colors'

const muiTheme = createMuiTheme({
	palette: {
		primary: grey,
		accent: amber,
		error: red,
		type: 'dark'
	}
})

const rootEl = document.getElementById('app-content')

const render = (App) => {
	ReactDOM.render(
		<MuiThemeProvider theme={muiTheme}>
			<AppContainer>
				<App />
			</AppContainer>
		</MuiThemeProvider>,
		rootEl
	)
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./containers/App', () => {
		const NextApp = require('./containers/App').default
		render(NextApp)
	})
}
