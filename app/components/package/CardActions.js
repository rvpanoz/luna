/**
 * CardActions component
 *
 */

import { ipcRenderer } from 'electron'
import { APP_ACTIONS, APP_MODES } from 'constants/AppConstants'
import { showMessageBox } from '../../utils'
import { CardActions as MuiCardActions } from 'material-ui/Card'
import React from 'react'
import PropTypes from 'prop-types'
import AddIcon from 'material-ui-icons/Add'
import UpdateIcon from 'material-ui-icons/Update'
import DeleteIcon from 'material-ui-icons/Delete'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import classnames from 'classnames'
import Button from 'material-ui/Button'

const { object, func, bool, array } = PropTypes

class CardActions extends React.Component {
  constructor() {
    super()
    this.doAction = this.doAction.bind(this)
  }
  renderIcon(iconCls) {
    switch (iconCls) {
      case 'update':
        return <UpdateIcon />
        break
      case 'add':
        return <AddIcon />
      case 'trash':
        return <DeleteIcon />
      default:
        return null
    }
  }
  doAction(e) {
    e.preventDefault()
    const target = e.currentTarget
    const action = target.textContent.trim().toLowerCase()
    const {
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

    showMessageBox(
      {
        action: action,
        name: active.name,
        version: action === 'uninstall' ? null : version
      },
      () => {
        let npmCmd = [`npm ${action.toLowerCase()} `, active.name]
        if (mode === APP_MODES.LOCAL) {
          npmCmd.push(` --${cmdOptions.join(' --')}`)
        }
        setActive(null)
        toggleLoader(true)
        setupSnackbar({
          message: 'running ' + npmCmd.join(' ')
        })
        toggleSnackbar(true)
        ipcRenderer.send('ipc-event', {
          mode,
          directory,
          ipcEvent: action,
          cmd: [action],
          pkgName: active.name,
          pkgVersion: action === 'uninstall' ? null : version,
          pkgOptions: cmdOptions
        })
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
                variant="fab"
                color={action.color}
                aria-label={action.text}
                className={classes.button}
              >
                {this.renderIcon(action.iconCls)}
                {action.text}
              </Button>
            )
          })}
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </MuiCardActions>
    )
  }
}

CardActions.propTypes = {
  classes: object,
  handleExpandClick: func.isRequired,
  actions: array.isRequired,
  defaultActions: array.isRequired,
  expanded: bool.isRequired
}

export default CardActions
