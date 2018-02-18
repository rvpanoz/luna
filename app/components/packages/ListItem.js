/**
 * PackagesList
 *
 */

import { remote, ipcRenderer } from 'electron'
import React from 'react'
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List'
import { autoBind, showMessageBox } from '../../utils'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import Chip from 'material-ui/Chip'

class PackageListItem extends React.Component {
  constructor() {
    super()
    autoBind(['onItemClick', 'onUpdate', 'viewPackage'], this)
  }
  viewPackage() {
    const { name, version, mode, directory } = this.props

    ipcRenderer.send('ipc-event', {
      ipcEvent: 'view-package',
      cmd: ['view'],
      pkgName: name,
      pkgVersion: version,
      mode,
      directory
    })
  }
  onUpdate(e) {
    e.preventDefault()
    const { name, mode, directory, toggleMainLoader } = this.props

    toggleMainLoader(true)
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'update-package',
      cmd: 'install',
      pkgName: name,
      pkgVersion: 'latest',
      mode,
      directory
    })
  }
  onItemClick(e) {
    e.preventDefault()

    const { toggleMainLoader } = this.props
    toggleMainLoader(true)
    this.viewPackage()
    return false
  }
  render() {
    const { name, version, latest } = this.props
    let secondaryText = version

    if (!name) {
      return null
    }

    return (
      <ListItem button onClick={this.onItemClick}>
        <ListItemText
          primary={`${name} ${version}`}
          secondary={`${latest ? ` \nlatest: ${latest}` : 'up to date'}`}
        />
        <ListItemSecondaryAction>
          {latest ? (
            <IconButton
              color="accent"
              onClick={this.onUpdate}
              aria-label="Update"
            >
              <Icon>alarm</Icon>
            </IconButton>
          ) : null}
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default PackageListItem
