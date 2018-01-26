/**
 * App Component
 */

'use strict'

//imports
import React from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import Reboot from 'material-ui/Reboot'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import { APP_GLOBALS } from '../constants/AppConstants'

//Components
import Layout from './Layout'
import Header from '../components/Header'
import Sidebar from './Sidebar'
import Main from './Main'

export default function App(props) {
	const { store } = props

	//for now use the default
	const muiTheme = createMuiTheme()

	return (
		<section>
			<Reboot />
			<Provider store={store}>
				<MuiThemeProvider theme={muiTheme}>
					<Layout />
				</MuiThemeProvider>
			</Provider>
		</section>
	)
}
