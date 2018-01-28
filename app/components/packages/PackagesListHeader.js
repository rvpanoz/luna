'use strict'

import React from 'react'
import { remote, ipcRenderer } from 'electron'
import { APP_MODES } from '../../constants/AppConstants'
import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import classnames from 'classnames'
import { packagesListStyles } from '../styles'
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import Menu, { MenuItem } from 'material-ui/Menu'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import PackagesListSearch from './PackagesListSearch'

const ITEM_HEIGHT = 48

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
		const {
			classes,
			totalInstalled,
			setGlobalMode,
			mode,
			directory,
			setActive,
			toggleLoader,
			setPackageActions
		} = this.props
		let anchorEl = this._anchorEl

		return (
			<section className={classes.flexColumn}>
				<div className={classes.flexRow}>
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
							onClose={this.handleClose}
							PaperProps={{
								style: {
									maxHeight: ITEM_HEIGHT * 4.5,
									width: 200
								}
							}}
						>
							<MenuItem key="1" onClick={setGlobalMode}>
								Global mode
							</MenuItem>
						</Menu>
					</div>
					<Divider />
				</div>
				<div className={classes.flexRow}>
					<Chip label={mode} className={classes.chip} />
					<Typography align="right" paragraph={true} type="subheading" className={classes.directory}>
						{directory}
					</Typography>
				</div>
				<PackagesListSearch
					mode={mode}
					directory={directory}
					setPackageActions={setPackageActions}
					toggleLoader={toggleLoader}
					setActive={setActive}
				/>
			</section>
		)
	}
}

export default withStyles(packagesListStyles)(PackagesListHeader)
