import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const styles = {
	root: {
		width: '100%'
	},
	flex: {
		flex: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	}
}

const Header = (props) => {
	const { classes, title } = props
	return (
		<AppBar position="static" color="default" className={classes.root}>
			<Toolbar>
				<Typography type="title" color="inherit">
					{title}
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

Header.propTypes = {
	title: PropTypes.string.isRequired
}

export default withStyles(styles)(Header)
