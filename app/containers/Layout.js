/**
Layout component
**/

'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import AppHeader from '../components/AppHeader'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import Grid from 'material-ui/Grid'
import PackagesContainer from './Packages'
import { layoutStyles } from './styles'

class Layout extends React.Component {
	constructor() {
		super()
	}

	render() {
		const { classes, theme } = this.props

		return (
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<AppHeader theme={theme} title="Luna" />
					<main className={classes.content}>
						<Grid container justify="space-between">
							<Grid item xs={4}>
								<PackagesContainer />
							</Grid>
							<Grid item xs={8} />
						</Grid>
					</main>
				</div>
			</div>
		)
	}
}

Layout.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
}

export default withStyles(layoutStyles, { withTheme: true })(Layout)
