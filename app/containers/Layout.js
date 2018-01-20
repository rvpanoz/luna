/**
 * Base Layout
 */

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'

const styles = (theme) => ({
	root: {
		display: 'flex',
		flexGrow: 2,
		flexDirection: 'column'
	}
})

class Layout extends React.Component {
	constructor(props) {
		super(props)
		this.AppHeader = null
		this.AppMain = null
		this.getElementByPosition = this.getElementByPosition.bind(this)
	}
	getElementByPosition(position) {
		const { children } = this.props
		return R.filter(
			R.where({
				props: R.propEq('position', position)
			})
		)(children)[0]
	}
	componentWillMount() {
		this.AppHeader = this.getElementByPosition('header')
		this.AppMain = this.getElementByPosition('main')
	}
	render() {
		const { classes, children } = this.props

		return (
			<Grid container className={classes.root}>
				<Grid item xs={12}>
					{this.AppHeader}
				</Grid>
				<Grid item xs={12}>
					{this.AppMain}
				</Grid>
			</Grid>
		)
	}
}

Layout.propTypes = {
	children: PropTypes.node.isRequired
}

export default withStyles(styles)(Layout)
