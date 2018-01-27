'use strict'

import React from 'react'
import { remote, ipcRenderer } from 'electron'
import { APP_MODES } from '../../constants/AppConstants'
import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import classnames from 'classnames'
import { packagesListStyles } from '../styles'
import IconButton from 'material-ui/IconButton'
import Menu, { MenuItem } from 'material-ui/Menu'
import MoreVertIcon from 'material-ui-icons/MoreVert'

const ITEM_HEIGHT = 48
const options = ['Global mode', 'Refresh']

class PackagesListHeader extends React.Component {
	constructor(props) {
		super(props)
		this._anchorEl = null
		this.handleClick = this.handleClick.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}
	handleClick(e) {
		this._anchorEl = e.currentTarget
		this.forceUpdate()
	}
	handleClose(e) {
		this._anchorEl = null
		this.forceUpdate()
	}
	render() {
		const { classes, totalInstalled } = this.props
		let anchorEl = this._anchorEl

		return (
			<section>
				<div className={classes.flex}>
					<h3 className={classes.heading}>Packages</h3>
					<Avatar className={classes.purpleAvatar}>{totalInstalled}</Avatar>
					<div style={{ marginLeft: 'auto' }}>
						<IconButton
							aria-label="More"
							aria-owns={anchorEl ? 'long-menu' : null}
							aria-haspopup="true"
							onClick={this.handleClick}
							className={classes.iconbutton}
						>
							<MoreVertIcon />
						</IconButton>
						<Menu
							id="long-menu"
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={(e) => false}
							PaperProps={{
								style: {
									maxHeight: ITEM_HEIGHT * 4.5,
									width: 200
								}
							}}
						>
							{options.map((option) => (
								<MenuItem key={option} selected={option === 'Global mode'} onClick={this.handleClose}>
									{option}
								</MenuItem>
							))}
						</Menu>
					</div>
				</div>
				<Divider />
			</section>
		)
	}
}

export default withStyles(packagesListStyles)(PackagesListHeader)
