/**
 * SnackBar
 *
 **/

import { withStyles } from 'material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'
import Button from 'material-ui/Button'

const styles = (theme) => {
  return {
    root: {
      marginTop: 3
    }
  }
}

const SnackbarAction = (props) => {
  const { actionText, action } = props

  return (
    <Button color="primary" size="small" onClick={(e) => action(e)}>
      {actionText}
    </Button>
  )
}

class SnackBar extends React.Component {
  static defaultProps = {
    position: {
      vertical: 'top',
      horizontal: 'center'
    }
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {
      classes,
      snackBarOpen,
      handleSnackBarClose,
      message,
      position,
      loader,
      actionText
    } = this.props

    return (
      <Snackbar
        className={classes.root}
        resumeHideDuration={5}
        anchorOrigin={position}
        open={snackBarOpen}
        onClose={(e) => {
          handleSnackBarClose()
        }}
        SnackbarContentProps={{
          'aria-describedby': 'message'
        }}
        message={
          <div className="saving">
            {message}
            {!loader ? null : (
              <span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            )}
          </div>
        }
        action={
          actionText ? (
            <SnackbarAction
              actionText={actionText}
              action={handleSnackBarClose}
            />
          ) : null
        }
      />
    )
  }
}

const { bool, func, string, object } = PropTypes

SnackBar.propTypes = {
  snackBarOpen: bool.isRequired,
  message: string,
  position: object,
  loader: bool,
  action: func,
  actionText: string
}

export default withStyles(styles)(SnackBar)
