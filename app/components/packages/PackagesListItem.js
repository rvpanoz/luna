'use strict'

import { remote, ipcRenderer } from 'electron'
import React from 'react'
import { withStyles } from 'material-ui/styles'
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'

class PackageListItem extends React.Component {
	constructor(props) {
		super(props)
		this._needsUpdates = true
		this.onItemClick = this.onItemClick.bind(this)
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
	render() {
		const { name, version } = this.props
		const { classes } = this.props
		if (!name) {
			return null
		}
		return (
			<ListItem button onClick={this.onItemClick}>
				<ListItemText primary={name} secondary={version} />
				<ListItemSecondaryAction>
					<IconButton aria-label="Delete">delete</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		)
	}
}

export default withStyles()(PackageListItem)
