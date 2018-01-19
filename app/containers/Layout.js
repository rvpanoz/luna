/**
 * Base Layout
 */

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const styles = (theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
		marginTop: 30
	}
})

const Layout = (props) => {
	const { classes, children } = props

	const RootEl = React.createElement('section', {
		className: classes.root,
		children
	})

	return RootEl
}

Layout.propTypes = {
	children: PropTypes.node.isRequired
}

export default withStyles(styles)(Layout)
