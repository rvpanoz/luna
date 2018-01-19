/**
 * Base Layout
 */

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import { pinkA700, lightBlue900, red } from 'material-ui/colors'

const muiTheme = createMuiTheme({
	palette: {
		primary: lightBlue900,
		accent: pinkA700,
		error: red,
		type: 'dark'
	}
})

const styles = (theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
		marginTop: 30
	}
})

class Layout extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { classes, children } = this.props
		const muiThemeProvider = React.createElement(<MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>)

		return React.createElement('section', {
			className: classes.root,
			children
		})

		return RootEl
	}
}

Layout.propTypes = {
	children: PropTypes.node.isRequired
}

export default withStyles(styles)(Layout)
