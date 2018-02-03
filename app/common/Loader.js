/**
 * Common Loader component
 */

import React from 'react'
import { withStyles } from 'material-ui/styles'
import { loaderStyles } from './styles'
import { CircularProgress } from 'material-ui/Progress'

const AppLoader = (props) => {
  const { loading, classes } = props
  return loading ? (
    <CircularProgress className={classes.loader} color="secondary" />
  ) : (
    props.children
  )
}

export default withStyles(loaderStyles)(AppLoader)
