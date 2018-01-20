import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const Header = (props) => {
	const { title } = props
	return (
		<AppBar position="static" color="default">
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

export default Header
