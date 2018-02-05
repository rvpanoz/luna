import { remote, ipcRenderer } from 'electron'
import React from 'react'
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List'
import { showMessageBox } from '../../utils'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import Chip from 'material-ui/Chip'

class PackageListItem extends React.Component {
  constructor() {
    super()
    this.onItemClick = this.onItemClick.bind(this)
  }
  onItemClick(e) {
    e.preventDefault()

    const {
      name,
      version,
      mode,
      directory,
      toggleMainLoader,
      latest
    } = this.props

    toggleMainLoader(true)
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'view-package',
      cmd: ['view'],
      pkgName: name,
      pkgVersion: version,
      mode,
      directory
    })
  }
  render() {
    const { name, version, latest } = this.props
    let secondaryText = version

    if (!name) {
      return null
    }

    return (
      <ListItem button onClick={this.onItemClick}>
        <ListItemText primary={name} secondary={version} />
        <ListItemSecondaryAction>
          {latest ? (
            <IconButton
              color="accent"
              onClick={this.update}
              aria-label="Update"
            >
              update
            </IconButton>
          ) : null}
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default PackageListItem
