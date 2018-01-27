/**
AppHeader with mini drawer
**/

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Drawer from 'material-ui/Drawer'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import classNames from 'classnames'
import MenuIcon from 'material-ui-icons/Menu'
import IconButton from 'material-ui/IconButton'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import ChevronRightIcon from 'material-ui-icons/ChevronRight'
import AppHeaderContent from './AppHeaderContent'
import { appHeaderStyles } from './styles'

const AppHeader = (props) => {
	const { menuOpen, classes, handleDrawerOpen, handleDrawerClose, title, theme } = props
	return (
		<section>
			<AppBar className={classNames(classes.appBar, menuOpen && classes.appBarShift)}>
				<Toolbar disableGutters={!menuOpen}>
					<IconButton
						color="inherit"
						aria-label="open menu"
						onClick={handleDrawerOpen}
						className={classNames(classes.menuButton, menuOpen && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography type="title" color="inherit" noWrap>
						{title}
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				type="permanent"
				classes={{
					paper: classNames(classes.drawerPaper, !menuOpen && classes.drawerPaperClose)
				}}
				open={menuOpen}
			>
				<div className={classes.drawerInner}>
					<div className={classes.drawerHeader}>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
					</div>
					<Divider />
					<AppHeaderContent />
				</div>
			</Drawer>
		</section>
	)
}

AppHeader.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
}

export default withStyles(appHeaderStyles)(AppHeader)
