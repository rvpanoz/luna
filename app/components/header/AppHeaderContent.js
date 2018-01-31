'use strict'

import { remote, ipcRenderer } from 'electron'
import React from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Icon from 'material-ui/Icon'
import * as globalActions from 'actions/global_actions'
import { APP_MODES } from 'constants/AppConstants'
import { withStyles } from 'material-ui/styles'
import Modal from 'material-ui/Modal'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Tooltip from 'material-ui/Tooltip'
import Button from 'material-ui/Button'
import { appHeaderContentStyles } from '../styles'

class AppHeaderContent extends React.Component {
	constructor() {
		super()
		this.openPackage = this.openPackage.bind(this)
		this.updateMode = this.updateMode.bind(this)
	}
	updateMode(directory) {
		ipcRenderer.send('analyze-json', directory)
	}
	getModalStyles() {
		function rand() {
			return Math.floor(Math.random() * 20) - 10
		}

		const top = 50 + rand()
		const left = 50 + rand()

		return {
			position: 'absolute',
			width: 8 * 50,
			top: `${top}%`,
			left: `${left}%`,
			transform: `translate(-${top}%, -${left}%)`,
			border: '1px solid #e5e5e5',
			backgroundColor: '#fff',
			boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
			padding: 8 * 4
		}
	}
	openSettings() {}
	handleChange(e) {
		// console.log(e.target.value);
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
		const npmRegistry = 'https://registry.npmjs.org/'
		const npmProxy = 'http://proxy.company.com:8080'

		return (
			<section>
				<List>
					<ListItem button onClick={this.openPackage}>
						<Tooltip title="Analyze package.json file" placement="right-start">
							<ListItemIcon>
								<Icon className={classes.iconHover}>send</Icon>
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary="Analyze" secondary="Open package.json" />
					</ListItem>
					<ListItem button>
						<Tooltip title="Open application settings" placement="right-start">
							<ListItemIcon>
								<Icon>settings</Icon>
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary="Settings" secondary="Application settings" />
					</ListItem>
				</List>
				<Modal aria-labelledby="settings" aria-describedby="set npm settings" open={false} onClose={this.handleModal}>
					<div style={this.getModalStyles()} className={classes.paper}>
						<form className={classes.container} noValidate autoComplete="off">
							<h3 className={classes.heading}>Settings</h3>
							<Divider />
							<TextField
								id="npm-registry"
								label="Registry"
								className={classes.textField}
								value={npmRegistry}
								onChange={this.handleChange}
								margin="normal"
							/>
							<TextField
								id="npm-proxy"
								label="Proxy"
								className={classes.textField}
								value={npmProxy}
								onChange={this.handleChange}
								margin="normal"
							/>
							<Button className={classes.button}>Save</Button>
						</form>
					</div>
				</Modal>
			</section>
		)
	}
}

export default withStyles(appHeaderContentStyles)(AppHeaderContent)
