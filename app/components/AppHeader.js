'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Drawer from 'material-ui/Drawer'
import * as globalActions from '../actions/global_actions'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import classNames from 'classnames'
import MenuIcon from 'material-ui-icons/Menu'
import IconButton from 'material-ui/IconButton'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import ChevronRightIcon from 'material-ui-icons/ChevronRight'
import AppHeaderContent from './AppHeaderContent'

const drawerWidth = 240

const styles = (theme) => ({
	appBar: {
		position: 'fixed',
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerInner: {
		// Make the items inside not wrap when transitioning:
		width: drawerWidth
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	drawerPaperClose: {
		width: 60,
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36
	},
	hide: {
		display: 'none'
	}
})

class AppHeader extends React.Component {
	constructor() {
		super()
	}
	render() {
		const { title, menuOpen, handleDrawerOpen, handleDrawerClose, classes, theme } = this.props

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
}

function mapStateToProps(state) {
	return {
		menuOpen: state.global.menuOpen
	}
}

function mapDispatchToProps(dispatch) {
	return {
		handleDrawerOpen: () => dispatch(globalActions.handleDrawer(true)),
		handleDrawerClose: () => dispatch(globalActions.handleDrawer(false))
	}
}

AppHeader.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(AppHeader)
