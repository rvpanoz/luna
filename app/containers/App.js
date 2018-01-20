/**
 * App Component
 */

'use strict'

//imports
import React from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import { pinkA700, lightBlue900, red } from 'material-ui/colors'

//Components
import Layout from './Layout'
import Header from '../common/Header'
import Main from './Main'

export default function App(props) {
	console.log(props)
	const { store } = props

	//create material-ui custom theme
	const muiTheme = createMuiTheme({
		palette: {
			primary: lightBlue900,
			accent: pinkA700,
			error: red,
			type: 'dark'
		}
	})
	return (
		<Provider store={store}>
			<MuiThemeProvider theme={muiTheme}>
				<Layout>
					<Header position="header" title="npman" />
					<Main position="main" />
				</Layout>
			</MuiThemeProvider>
		</Provider>
	)
}
