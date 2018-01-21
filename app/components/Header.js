import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import MenuIcon from 'material-ui/Menu'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Typography from 'material-ui/Typography'

const styles = {
	root: {
		width: '100%'
	},
	flex: {
		flex: 1
	}
}

const Header = (props) => {
	const { classes, title } = props
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography type="title" color="inherit" className={classes.flex}>
						{title}
					</Typography>
					<Button color="contrast">
						<Icon color="accent">notifications</Icon>
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}

Header.propTypes = {
	title: PropTypes.string.isRequired
}

export default withStyles(styles)(Header)
