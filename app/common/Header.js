import React from 'react'
import AppBar from 'material-ui/AppBar'

const Header = (props) => {
	return (
		<AppBar title={props.title}>
			<h1>npman</h1>
		</AppBar>
	)
}

export default Header
