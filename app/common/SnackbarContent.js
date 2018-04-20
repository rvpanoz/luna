import React from 'react'
import { withStyles, SnackbarContent as Snack, IconButton } from 'material-ui'
import { Close } from 'material-ui-icons'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {
  defaultFont,
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow
} from 'styles/variables'

const styles = (theme) => ({
  root: {
    ...defaultFont,
    position: 'relative',
    padding: theme.spacing.unit,
    lineHeight: '10px',
    marginBottom: 5,
    fontSize: 14,
    backgroundColor: 'white',
    color: '#555555',
    borderRadius: '3px',
    boxShadow:
      '0 12px 20px -10px rgba(255, 255, 255, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 255, 255, 0.2)'
  },
  info: {
    backgroundColor: '#00d3ee',
    color: '#ffffff',
    ...infoBoxShadow
  },
  success: {
    backgroundColor: '#5cb860',
    color: '#ffffff',
    ...successBoxShadow
  },
  warning: {
    backgroundColor: '#ffa21a',
    color: '#ffffff',
    ...warningBoxShadow
  },
  danger: {
    backgroundColor: theme.palette.error.dark,
    color: '#ffffff',
    ...dangerBoxShadow
  },
  primary: {
    backgroundColor: theme.palette.primary.light,
    color: '#ffffff',
    ...primaryBoxShadow
  },
  secondary: {
    backgroundColor: theme.palette.secondary.light,
    color: '#ffffff',
    ...primaryBoxShadow
  },
  message: {
    padding: '0',
    display: 'block',
    maxWidth: '89%'
  },
  close: {
    width: '14px',
    height: '14px'
  },
  iconButton: {
    width: '24px',
    height: '24px'
  },
  icon: {
    display: 'block',
    left: '15px',
    position: 'absolute',
    top: '50%',
    marginTop: '-15px',
    width: '30px',
    height: '30px'
  },
  iconMessage: {
    paddingLeft: '65px',
    display: 'block'
  }
})

function SnackbarContent({ ...props }) {
  const { classes, message, color, close, icon } = props
  var action = []
  const messageClasses = cx({
    [classes.iconMessage]: icon !== undefined
  })

  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
      >
        <Close className={classes.close} />
      </IconButton>
    ]
  }

  return (
    <Snack
      message={
        <div>
          {icon ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      classes={{
        root: classes.root + ' ' + classes[color],
        message: classes.message
      }}
      action={action}
    />
  )
}

SnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['info', 'success', 'warning', 'danger', 'primary']),
  close: PropTypes.bool,
  icon: PropTypes.func
}

export default withStyles(styles)(SnackbarContent)
