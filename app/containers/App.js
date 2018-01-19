/**
 * App Component
 */

'use strict'

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store'
import PropTypes from 'prop-types'
import Layout from './Layout'

const store = configureStore()

const App = (props) => {
	const { classes } = props
	return (
		<Provider store={store}>
			<Layout>
				<header />
				<main />
			</Layout>
		</Provider>
	)
}

export default App
