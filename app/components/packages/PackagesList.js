/**
PackagesList
* */

import { ipcRenderer } from 'electron'
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Loader from '../../common/Loader'
import PackageListItem from './PackagesListItem'
import { withStyles } from 'material-ui/styles'
import * as globalActions from '../../actions/global_actions'
import List from 'material-ui/List'
import { packagesListStyles } from '../styles'
import PackagesListHeader from './PackagesListHeader'

class PackagesList extends React.Component {
	constructor() {
		super()
		this.getPackages = this.getPackages.bind(this)
	}
	getPackages() {
		const { mode, directory } = this.props
		ipcRenderer.send('ipc-event', {
			ipcEvent: 'get-packages',
			cmd: ['outdated', 'list'],
			mode,
			directory
		})
	}
	componentDidMount() {
		const { toggleLoader } = this.props
		toggleLoader(true)
		this.getPackages()
	}
	render() {
		const { packages, total, loading, mode, directory, toggleMainLoader, toggleLoader, setMode } = this.props

		return (
			<section>
				<PackagesListHeader
					mode={mode}
					total={total}
					directory={directory}
					toggleLoader={toggleLoader}
					setMode={setMode}
				/>
				<Loader loading={loading}>
					<List>
						{packages
							? packages.map((pkg, idx) => {
									if (!pkg) return
									const hasPeerMissing = pkg.peerMissing
									if (hasPeerMissing) {
										return
									}
									const version = pkg.version
									const readme = pkg.readme
									const name = pkg.from ? pkg.from.split('@')[0] : pkg.name
									const latest = pkg.latest
									return (
										<PackageListItem
											mode={mode}
											directory={directory}
											toggleMainLoader={toggleMainLoader}
											idx={idx}
											key={idx}
											name={name}
											readme={readme}
											description={pkg.description ? pkg.description : null}
											version={version}
											latest={latest}
										/>
									)
								})
							: null}
					</List>
				</Loader>
			</section>
		)
	}
}

function mapStateToProps(state) {
	return {
		loading: state.global.loading,
		total: state.packages.total,
		mode: state.global.mode,
		directory: state.global.directory
	}
}

function mapDispatchToProps(dispatch) {
	return {
		toggleLoader: (bool) => dispatch(globalActions.toggleLoader(bool))
	}
}

export default compose(
	withStyles(packagesListStyles, { withTheme: true }),
	connect(mapStateToProps, mapDispatchToProps)
)(PackagesList)
