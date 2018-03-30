/**
 * CardActions component
 */

import { remote } from 'electron'
import { APP_ACTIONS, APP_MODES } from 'constants/AppConstants'
import { triggerEvent, firstToUpper } from 'utils'
import { CardActions as MuiCardActions } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import Delete from 'material-ui-icons/Delete'
import Update from 'material-ui-icons/Update'
import classnames from 'classnames'
import Button from 'material-ui/Button'

const { object, func, bool, array } = PropTypes
const styles = (theme) => {
  return {
    actions: {
      display: 'flex'
    },
    button: {
      margin: theme.spacing.unit
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      }),
      marginLeft: 'auto'
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    }
  }
}

class CardActions extends React.Component {
  constructor() {
    super()
    this.doAction = this.doAction.bind(this)
  }
  doAction(e) {
    e.preventDefault()

    const target = e.currentTarget
    const action = target.textContent.trim().toLowerCase()
    const {
      actions,
      mode,
      directory,
      version,
      active,
      toggleLoader,
      cmdOptions,
      setActive,
      setupSnackbar,
      toggleSnackbar
    } = this.props

    if (!action || ['install', 'uninstall', 'update'].indexOf(action) === -1) {
      throw new Error(`doAction: action ${action} is invalid`)
    }

    remote.dialog.showMessageBox(
      remote.getCurrentWindow(),
      {
        title: 'Confirmation',
        type: 'question',
        message:
          action === 'uninstall'
            ? `Would you like to ${action} ${active.name}?`
            : `Would you like to ${action} ${active.name + '@' + version}?`,
        buttons: ['Cancel', firstToUpper(action)]
      },
      (btnIdx) => {
        if (Boolean(btnIdx) === true) {
          setActive(null)
          toggleLoader(true)
          triggerEvent(action, {
            mode,
            directory,
            cmd: [action === 'update' ? 'install' : action],
            pkgName: active.name,
            pkgVersion: action === 'uninstall' ? null : version,
            pkgOptions: cmdOptions
          })
        }
      }
    )

    return false
  }
  render() {
    const {
      classes,
      actions,
      defaultActions,
      expanded,
      handleExpandClick
    } = this.props

    return (
      <MuiCardActions className={classes.actions}>
        {actions &&
          actions.map((action, idx) => {
            return (
              <Button
                ref={action.text}
                key={idx}
                action={action.text}
                onClick={this.doAction}
                color={action.color}
                aria-label={action.text}
                className={classes.button}
              >
                {action.iconCls === 'uninstall' && (
                  <Delete className={classes.margin} />
                )}
                {action.iconCls === 'update' && (
                  <Update className={classes.margin} />
                )}
                {action.text}
              </Button>
            )
          })}
      </MuiCardActions>
    )
  }
}

CardActions.propTypes = {
  active: object.isRequired,
  classes: object.isRequired,
  handleExpandClick: func.isRequired,
  setActive: func.isRequired,
  actions: array.isRequired,
  defaultActions: array.isRequired,
  expanded: bool.isRequired
}

export default withStyles(styles)(CardActions)
