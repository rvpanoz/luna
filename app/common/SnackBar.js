/**
 * SnackBar
 *
 **/

import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'
import Button from 'material-ui/Button'

const SnackbarAction = (props) => {
  const { action, actionText } = props
  return (
    <Button color="accent" size="small" onClick={(e) => action()}>
      {actionText}
    </Button>
  )
}

const SnackBar = (props) => {
  const {
    snackBarOpen,
    handleSnackBarClose,
    action,
    actionText,
    message
  } = props

  return (
    <Snackbar
      resumeHideDuration={5}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={snackBarOpen}
      onClose={handleSnackBarClose}
      SnackbarContentProps={{
        'aria-describedby': 'message'
      }}
      action={
        action ? (
          <SnackbarAction action={action} actionText={actionText} />
        ) : null
      }
      message={<span id="message">{message}</span>}
    />
  )
}

const { bool, func, string } = PropTypes

SnackBar.propTypes = {
  snackBarOpen: bool.isRequired,
  action: func,
  actionText: string,
  message: string.isRequired
}

export default SnackBar
