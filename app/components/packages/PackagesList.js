import { remote, ipcRenderer } from 'electron'
import React from 'react'
import Loader from '../../common/Loader'
import PackageListItem from './PackagesListItem'
import { withStyles } from 'material-ui/styles'
import List from 'material-ui/List'

const styles = (theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
})

class PackagesList extends React.Component {
	constructor(props) {
		super(props)
		this.deselectAll = this.deselectAll.bind(this)
	}
	deselectAll() {
		let list = this.refs.list
		if (list) {
			let selected = list.querySelector('.selected')
			if (selected) {
				selected.classList.remove('selected')
			}
		}
	}
	componentDidMount() {
		let list = this.refs.list
		list.style['max-height'] = window.innerHeight - 250 + 'px'
		this.props.toggleLoader(true)
	}
	render() {
		const { packages, loading, toggleMainLoader, setActive } = this.props

		return (
			<Loader loading={loading}>
				<div ref="list">
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
				</div>
			</Loader>
		)
	}
}

export default PackagesList
