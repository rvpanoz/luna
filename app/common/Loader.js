/**
 * Common Loader component
 */

import React from 'react'
import { withStyles } from 'material-ui/styles'
import { loaderStyles } from './styles'

const AppLoader = (props) => {
	const { loading, classes } = props
	return loading ? <Loader className={classes.loader} /> : props.children
}

export default withStyles(loaderStyles)(AppLoader)
