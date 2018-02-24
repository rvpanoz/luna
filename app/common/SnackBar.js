import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'
import Button from 'material-ui/Button'

const Info = (props) => {
  const { action, actionText } = prop
}
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
      action={<SnackbarAction action={action} actionText={actionText} />}
      message={<span id="message">{message}</span>}
    />
  )
}

export default SnackBar
