import { remote, ipcRenderer } from 'electron'
import React from 'react'
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import Icon from 'material-ui/Icon'
import Chip from 'material-ui/Chip'
import { showMessageBox } from '../../utils'

class PackageListItem extends React.Component {
  constructor() {
    super()
    this.onItemClick = this.onItemClick.bind(this)
    this.uninstallPackage = this.uninstallPackage.bind(this)
  }
  onItemClick(e) {
    const { name, version, mode, directory, toggleMainLoader } = this.props
    e.preventDefault()
    toggleMainLoader(true)
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'view-package',
      cmd: ['view'],
      pkgName: name,
      pkgVersion: version,
      mode,
      directory
    })
    return false
  }
  uninstallPackage(e) {
    e.preventDefault()
    const { name, mode, directory } = this.props

    if (name) {
      showMessageBox(
        {
          action: 'uninstall',
          name
        },
        () => {
          ipcRenderer.send('ipc-event', {
            mode,
            directory,
            ipcEvent: 'Uninstall',
            cmd: ['uninstall'],
            pkgName: name
          })
        }
      )
    }

    return false
  }
  render() {
    const { name, version, latest } = this.props

    if (!name) {
      return null
    }

    return (
      <ListItem button onClick={this.onItemClick}>
        <Avatar>
          <Icon>{latest ? 'update' : 'done'}</Icon>
        </Avatar>
        <ListItemText primary={name} secondary={version} />
        <ListItemSecondaryAction>
          <IconButton onClick={this.uninstallPackage} aria-label="Uninstall">
            delete
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default PackageListItem
