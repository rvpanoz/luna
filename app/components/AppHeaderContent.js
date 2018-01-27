'use strict'

import { remote, ipcRenderer } from 'electron'
import React from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Icon from 'material-ui/Icon'
import { APP_MODES } from '../constants/AppConstants'
import { withStyles } from 'material-ui/styles'
import pink from 'material-ui/colors/pink'
import { appHeaderContentStyles } from './styles'

class AppHeaderContent extends React.Component {
	constructor() {
		super()
		this.openPackage = this.openPackage.bind(this)
		this.updateMode = this.updateMode.bind(this)
	}
	updateMode(directory) {
		ipcRenderer.send('analyze-json', directory)
	}
	openPackage(e) {
		e.preventDefault()
		remote.dialog.showOpenDialog(
			remote.getCurrentWindow(),
			{
				title: 'Open package.json file',
				buttonLabel: 'Analyze',
				filters: [
					{
						name: 'json',
						extensions: ['json']
					}
				],
				openFile: true
			},
			(filePath) => {
				if (filePath) {
					this.updateMode(filePath[0])
				}
			}
		)
	}

	render() {
		const { classes } = this.props

		return (
			<List>
				<ListItem button onClick={this.openPackage}>
					<ListItemIcon>
						<Icon className={classes.iconHover}>send</Icon>
					</ListItemIcon>
					<ListItemText primary="Analyze" secondary="Open package.json" />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<Icon>list</Icon>
					</ListItemIcon>
					<ListItemText primary="Outdated" secondary="Outdated packages" />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<Icon>settings</Icon>
					</ListItemIcon>
					<ListItemText primary="Settings" secondary="Application settings" />
				</ListItem>
			</List>
		)
	}
}

export default withStyles(appHeaderContentStyles)(AppHeaderContent)
