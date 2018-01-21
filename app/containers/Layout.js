/**
 * Base Layout
 */

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'

const styles = (theme) => {
	console.log('theme', theme)
	return {
		root: {
			display: 'flex',
			flexGrow: 1,
			flexDirection: 'column'
		}
	}
}

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
		this.AppSidebar = this.getElementByPosition('sidebar')
		this.AppMain = this.getElementByPosition('main')
	}
	render() {
		const { classes } = this.props

		return (
			<div className={classes.root}>
				<Grid container spacing={24}>
					<Grid item xs={12} sm={12}>
						<Paper className={classes.paper}>{this.AppHeader}</Paper>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Paper className={classes.paper}>{this.AppSidebar}</Paper>
					</Grid>
					<Grid item xs={12} sm={9}>
						<Paper className={classes.paper}>{this.AppMain}</Paper>
					</Grid>
				</Grid>
			</div>
		)
	}
}

Layout.propTypes = {
	children: PropTypes.node.isRequired
}

export default withStyles(styles)(Layout)
