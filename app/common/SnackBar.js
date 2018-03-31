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
    <Button color="secondary" size="small" onClick={(e) => action(e)}>
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
    console.log(this.props)
    return (
      <Snackbar
        action={
          actionText ? (
            <SnackbarAction
              actionText={actionText}
              action={handleSnackBarClose}
            />
          ) : null
        }
        className={classes.root}
        resumeHideDuration={5}
        anchorOrigin={position}
        open={snackBarOpen}
        onClose={handleSnackBarClose}
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
      />
    )
  }
}

const { bool, func, string } = PropTypes

SnackBar.propTypes = {
  snackBarOpen: bool.isRequired,
  message: string.isRequired
}

export default withStyles(styles)(SnackBar)
