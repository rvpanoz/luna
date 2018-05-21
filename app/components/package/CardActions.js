/**
 * CardActions component
 */

import { remote } from 'electron'
import { autoBind, triggerEvent, firstToUpper } from 'utils'
import { CardActions as MuiCardActions } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import IconButton from 'material-ui/IconButton'
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
      marginTop: theme.spacing.unit
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
  buildAction(daction, idx) {
    const { active, classes } = this.props

    return (
      <Button
        key={`act-${idx}`}
        variant="raised"
        color={daction.color}
        onClick={this.doAction}
        aria-label={daction.text}
        className={classes.button}
      >
        {daction.iconCls === 'install' && <Add className={classes.leftIcon} />}
        {daction.iconCls === 'update' && <Update className={classes.leftIcon} />}
        {daction.iconCls === 'uninstall' && (
          <Delete
            className={classnames(classes.leftIcon, classes.buttonUninstall)}
          />
        )}
        {daction.text}
      </Button>
    )
  }
  doAction(e) {
    e.preventDefault()

    const target = e.currentTarget
    const actionText = target.textContent.trim().toLowerCase()
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

    remote.dialog.showMessageBox(
      remote.getCurrentWindow(),
      {
        title: 'Confirmation',
        type: 'question',
        message:
          actionText === 'uninstall'
            ? `Would you like to ${actionText} ${active.name}?`
            : `Would you like to ${actionText} ${active.name + '@' + version}?`,
        buttons: ['Cancel', firstToUpper(actionText)]
      },
      (btnIdx) => {
        if (Boolean(btnIdx) === true) {
          setActive(null)
          toggleLoader(true)
          triggerEvent(actionText, {
            mode,
            directory,
            cmd: [actionText === 'update' ? 'install' : actionText],
            pkgName: active.name,
            pkgVersion: actionText === 'uninstall' || !isInstalled ? null : version,
            pkgOptions: cmdOptions
          })
        }
      }
    )

    return false
  }
  render() {
    const {
      active,
      actions,
      classes,
      expanded,
      handleExpandClick,
      isInstalled
    } = this.props

    return (
      <MuiCardActions className={classes.actions}>
        {isInstalled && actions
          ? actions.map((daction, idx) => {
              return this.buildAction(daction, idx)
            })
          : this.buildAction({
              color: 'secondary',
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
  expanded: bool.isRequired
}

export default withStyles(styles)(CardActions)
