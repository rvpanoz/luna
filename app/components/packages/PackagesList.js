'use strict'

import { remote, ipcRenderer } from 'electron'
import React from 'react'
import Loader from '../../common/Loader'
import PackageListItem from './PackagesListItem'
import { withStyles } from 'material-ui/styles'
import List from 'material-ui/List'
import { packagesListStyles } from '../styles'
import PackagesListHeader from './PackagesListHeader'

class PackagesList extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		const { toggleLoader } = this.props
		toggleLoader(true)
	}
	render() {
		const {
			packages,
			loading,
			mode,
			toggleMainLoader,
			setActive,
			setGlobalMode,
			loadData,
			totalInstalled,
			directory,
			classes
		} = this.props

		return (
			<section>
				<PackagesListHeader
					mode={mode}
					setGlobalMode={setGlobalMode}
					loadData={loadData}
					directory={directory}
					totalInstalled={totalInstalled}
				/>
				<Loader loading={loading}>
					<List>
						{packages
							? packages.map((pkg, idx) => {
									let hasPeerMissing = pkg.peerMissing
									if (hasPeerMissing) {
										return
									}
									let version = pkg.version
									let readme = pkg.readme
									let name = pkg.from ? pkg.from.split('@')[0] : pkg.name
									return (
										<PackageListItem
											setActive={setActive}
											toggleMainLoader={toggleMainLoader}
											deselectAll={this.deselectAll}
											idx={idx}
											key={idx}
											name={name}
											readme={readme}
											description={pkg.description ? pkg.description : null}
											version={version}
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

export default withStyles(packagesListStyles)(PackagesList)
