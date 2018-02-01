/**
AppHeader with mini drawer
**/

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Drawer from 'material-ui/Drawer'
import {compose} from 'redux'
import {connect} from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import classNames from 'classnames'
import Chip from 'material-ui/Chip';
import MenuIcon from 'material-ui-icons/Menu'
import IconButton from 'material-ui/IconButton'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import ChevronRightIcon from 'material-ui-icons/ChevronRight'
import AppHeaderContent from './AppHeaderContent'
import SearchBox from './SearchBox'

import { appHeaderStyles } from '../styles'

class AppHeader extends React.Component {
	constructor() {
		super()
	}
	render() {
		const { menuOpen, classes, handleDrawerOpen, handleDrawerClose, title, mode, directory, theme } = this.props

		return (
			<section>
				<AppBar className={classNames(classes.appBar, menuOpen && classes.appBarShift)}>
					<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<Toolbar disableGutters={!menuOpen}>
							<IconButton
								color="inherit"
								aria-label="open menu"
								onClick={handleDrawerOpen}
								className={classNames(classes.menuButton, menuOpen && classes.hide)}
							>
								<MenuIcon />
							</IconButton>
						</Toolbar>
						<div className={classes.info}>
						<Chip
							label={mode}
							className={classes.chip}
						/>
						<span>{directory}</span>
						</div>
						<SearchBox />
					</div>
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
		mode: state.global.mode,
		directory: state.global.directory
	}
}

AppHeader.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
}

export default compose(
  withStyles(appHeaderStyles, { withTheme: true }),
  connect(mapStateToProps)
)(AppHeader);
