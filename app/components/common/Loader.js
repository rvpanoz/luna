/**
 * Common Loader component
 */

import { withStyles } from 'material-ui/styles'
import { loaderStyles } from './styles'
import { CircularProgress } from 'material-ui/Progress'
import React from 'react'

const AppLoader = (props) => {
  const { loading, classes } = props

  return loading ? (
    <CircularProgress className={classes.root} />
  ) : (
    props.children
  )
}

export default withStyles(loaderStyles)(AppLoader)
