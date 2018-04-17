/**
 * CardActions component
 */

import { remote } from 'electron'
import { APP_ACTIONS, APP_MODES } from 'constants/AppConstants'
import { autoBind, triggerEvent, firstToUpper } from 'utils'
import { CardActions as MuiCardActions } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import Delete from 'material-ui-icons/Delete'
import Update from 'material-ui-icons/Update'
import Add from 'material-ui-icons/Add'
import classnames from 'classnames'
import Button from 'material-ui/Button'

const { object, func, bool, array } = PropTypes
const styles = (theme) => {
  return {
    actions: {
      display: 'flex',
      marginTop: theme.spacing.unit + 20
    },
    button: {
      margin: theme.spacing.unit
    },
    buttonUninstall: {
      color: theme.palette.error
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
    },
    leftIcon: {
      marginRight: theme.spacing.unit / 2
    },
    rightIcon: {
      marginLeft: theme.spacing.unit
    },
    iconSmall: {
      fontSize: 20
    }
  }
}

class CardActions extends React.Component {
  constructor(props) {
    super(props)
    autoBind(['buildAction', 'doAction'], this)
  }
  buildAction(action, isInstalled, idx) {
    const { classes } = this.props

    return (
      <Button
        key={`act-${idx}`}
        variant="raised"
        color={action.color}
        action={action.text}
        onClick={this.doAction}
        aria-label={action.text}
        className={classes.button}
      >
        {action.iconCls === 'install' && <Add className={classes.leftIcon} />}
        {action.iconCls === 'update' && <Update className={classes.leftIcon} />}
        {action.iconCls === 'uninstall' && (
          <Delete
            className={classnames(classes.leftIcon, classes.buttonUninstall)}
          />
        )}
        {!isInstalled ? 'Install' : action.text}
      </Button>
    )
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
      isInstalled,
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
            pkgVersion: action === 'uninstall' || !isInstalled ? null : version,
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
      handleExpandClick,
      isInstalled
    } = this.props

    return (
      <MuiCardActions className={classes.actions}>
        {isInstalled && actions
          ? actions.map((action, idx) => {
              return this.buildAction(action, isInstalled, idx)
            })
          : this.buildAction({
              color: 'primary',
              text: 'Install',
              iconCls: 'install'
            })}
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={(e) => handleExpandClick(e)}
          aria-expanded={expanded}
          aria-label="Show details"
        >
          <ExpandMoreIcon />
        </IconButton>
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
