/**
 * PackagesList
 *
 */

import { APP_MODES, PACKAGE_GROUPS } from 'constants/AppConstants'
import { autoBind, triggerEvent, showMessageBox } from 'utils'
import React from 'react'
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import Chip from 'material-ui/Chip'

class PackageListItem extends React.Component {
  constructor() {
    super()
    autoBind(
      [
        'onItemCheck',
        'onItemClick',
        'updatePackage',
        'viewPackage',
        'primatyText',
        'secondaryText'
      ],
      this
    )
  }
  viewPackage() {
    const { name, version, mode, directory } = this.props
    triggerEvent('view-package', {
      cmd: ['view'],
      pkgName: name,
      pkgVersion: version,
      mode,
      directory
    })
  }
  updatePackage(e) {
    e.preventDefault()
    const { name, mode, directory, toggleMainLoader, packageJSON } = this.props
    const groups = ['dependencies', 'devDependencies', 'optionalDependencies']

    let pkgOptions = []
    if (mode === APP_MODES.LOCAL) {
      groups.some((group, idx) => {
        while (packageJSON[group] && packageJSON[group][name]) {
          pkgOptions.push(PACKAGE_GROUPS[group])
          return
        }
      })
    }

    showMessageBox(
      {
        action: 'update',
        name
      },
      () => {
        toggleMainLoader(true)
        triggerEvent('update-package', {
          cmd: ['install'],
          pkgName: name,
          pkgVersion: 'latest',
          pkgOptions,
          mode,
          directory
        })
      }
    )
  }
  onItemCheck(e) {
    const { name, setSelectedPackage } = this.props
    e.stopPropagation()
    setSelectedPackage(name)
  }
  onItemClick(e) {
    const { toggleMainLoader } = this.props
    e.preventDefault()
    toggleMainLoader(true)
    this.viewPackage()
    return false
  }
  primaryText() {
    const { name, version, latest } = this.props
    return <span>{`${name} - ${version}`}</span>
  }
  secondaryText() {
    const { version, latest } = this.props
    return <span>{latest ? `\nlatest ${latest}` : null}</span>
  }
  render() {
    const { name, version, latest, selected } = this.props

    if (!name) {
      return null
    }

    return (
      <ListItem button onClick={this.onItemClick}>
        <Checkbox
          checked={selected.indexOf(name) !== -1}
          tabIndex={-1}
          disableRipple
          onClick={this.onItemCheck}
        />
        <ListItemText
          primary={this.primaryText()}
          secondary={this.secondaryText()}
        />
        <ListItemSecondaryAction>
          {latest ? (
            <IconButton
              color="accent"
              onClick={this.updatePackage}
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

const { string } = PropTypes

PackageListItem.propTypes = {
  name: string.isRequired,
  version: string.isRequired,
  latest: string
}

export default PackageListItem
