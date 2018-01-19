/**
 * App Component
 */

'use strict'

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store'
import PropTypes from 'prop-types'
import Layout from './Layout'
import Header from '../common/Header'
import Main from './Main'
const store = configureStore()

const App = () => {
	return (
		<Provider store={store}>
			<Layout>
				<Header />
				<Main />
			</Layout>
		</Provider>
	)
}

export default App
