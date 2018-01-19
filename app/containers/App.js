/**
 * App Component
 */

'use strict'

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const store = configureStore()
const styles = (theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
		marginTop: 30
	}
})

const App = (props) => {
	const { classes } = props
	return (
		<Provider store={store}>
			<div className={classes.root} />
		</Provider>
	)
}

export default withStyles(styles)(App)
