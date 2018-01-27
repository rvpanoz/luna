/**
 * Packages Container Component - handles state.packages slice
 * pass state as props to children
 **/

'use strict'

import { remote, ipcRenderer } from 'electron'
import React from 'react'
import { parse } from '../utils'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { APP_MODES } from '../constants/AppConstants'
import * as globalActions from '../actions/global_actions'
import * as packagesActions from '../actions/packages_actions'
import Grid from 'material-ui/Grid'
import PackagesList from '../components/packages/PackagesList'
import PackageContainer from './Package'

class PackagesContainer extends React.Component {
	constructor(props) {
		super(props)
		this._autoBind(['loadData', 'setGlobalMode', '_setupList', '_setupOutdated', '_viewPackage', '_clearUI'])
	}
	_autoBind(handlers) {
		R.forEach((handler) => {
			if (typeof this[handler] === 'function') {
				this[handler] = this[handler].bind(this)
			}
		}, handlers)
	}
	_setupList(packages) {
		let packagesData = parse(packages, 'dependencies')
		this.props.setPackages(packagesData)
		let total = 0
		this.props.clearMessages()
		total = packagesData.filter((pkg, idx) => {
			return !pkg.peerMissing && pkg.from
		}).length
		this.props.setTotalInstalled(total)
		let notifications = parse(packages, 'problems')
		notifications.forEach((notification, idx) => {
			this.props.addMessage('error', notification)
		})
	}
	_setupOutdated(packages) {
		if (!packages) {
			this.props.setPackagesOutdated([])
			return
		}
		let outdatedData = JSON.parse(packages)
		this.props.setPackagesOutdated(outdatedData)
	}
	_viewPackage(name, version) {
		ipcRenderer.send('ipc-event', {
			ipcEvent: 'view-package',
			cmd: ['view'],
			pkgName: name,
			pkgVersion: version,
			mode: this.props.mode,
			directory: this.props.directory
		})
	}
	_clearUI() {
		let { showModal, setActive, setPackageActions, toggleMainLoader, toggleModal, setPackagesOutdated } = this.props
		setActive(null)
		setPackageActions()
		setPackagesOutdated([])
		toggleMainLoader(false)
		if (showModal) {
			toggleModal(false)
		}
	}
	setGlobalMode(e) {
		const { mode, toggleLoader, setMode, setActive, setPackageActions } = this.props
		e.preventDefault()
		if (mode === APP_MODES.GLOBAL) {
			return
		}
		toggleLoader(true)
		setMode(APP_MODES.GLOBAL, null)
		setActive(null)
		setPackageActions()
		ipcRenderer.send('ipc-event', {
			ipcEvent: 'get-packages',
			cmd: ['list', 'outdated'],
			mode: APP_MODES.GLOBAL
		})
	}
	loadData() {
		const { mode, directory } = this.props
		this._clearUI()
		ipcRenderer.send('ipc-event', {
			ipcEvent: 'get-packages',
			cmd: ['list', 'outdated'],
			mode: mode,
			directory: directory
		})
	}
	componentDidMount() {
		this.loadData()
		ipcRenderer.on('get-packages-close', (event, packages, command) => {
			if (!packages) {
				return
			}
			switch (command) {
				case 'outdated':
					this._setupOutdated(packages)
					break
				default:
					this._setupList(packages)
			}

			// close loader
			this.props.toggleLoader(false)
		})
		ipcRenderer.on('search-packages-close', (event, packagesStr) => {
			let packages = JSON.parse(packagesStr)
			this.props.setPackages(packages)
			this.props.toggleLoader(false)
		})
		ipcRenderer.on('view-package-close', (event, packageStr) => {
			let pkg
			try {
				pkg = JSON.parse(packageStr)
			} catch (e) {
				console.error(e)
			}

			if (pkg) {
				this.props.setActive(pkg)
				this.props.toggleMainLoader(false)
			} else {
				throw new Error('Package cannot be parsed')
			}
		})

		ipcRenderer.on('action-close', (event, pkg) => {
			let mode = this.props.mode,
				directory = this.props.directory
			if (mode === APP_MODES.LOCAL && directory) {
				ipcRenderer.send('analyze-json', directory)
				return
			}
			this.loadData()
		})
		ipcRenderer.on('ipcEvent-error', (event, error) => {
			// console.error(error);
		})
		ipcRenderer.on('analyze-json-close', (event, filePath, content) => {
			this.props.setMode(APP_MODES.LOCAL, filePath)
			this.props.setActive(null)
			this.props.setPackageJSON(content)
			this.props.toggleLoader(true)

			//TODO: ... remove setTimeout
			setTimeout(() => {
				this.loadData()
			}, 3000)
		})
	}
	componentWillUnMount() {
		ipcRenderer.removeAllListeners([
			'get-packages-close',
			'search-packages-close',
			'action-close',
			'view-package-reply',
			'ipcEvent-error',
			'analyze-json-close'
		])
	}
	render() {
		const {
			loading,
			mode,
			directory,
			packages,
			setPackageActions,
			toggleLoader,
			setActive,
			toggleMainLoader,
			totalInstalled
		} = this.props

		return (
			<Grid container justify="space-between">
				<Grid item xs={5}>
					<PackagesList
						loading={loading}
						packages={packages}
						toggleLoader={toggleLoader}
						setActive={setActive}
						toggleMainLoader={toggleMainLoader}
						mode={mode}
						directory={directory}
						setGlobalMode={this.setGlobalMode}
						loadData={this.loadData}
						totalInstalled={totalInstalled}
						setPackageActions={setPackageActions}
					/>
				</Grid>
				<Grid item xs={7}>
					<PackageContainer />
				</Grid>
			</Grid>
		)
	}
}

function mapStateToProps(state) {
	return {
		mode: state.global.mode,
		directory: state.global.directory,
		loading: state.global.loading,
		showModal: state.global.showModal,
		packages: state.packages.packages,
		active: state.packages.active,
		totalInstalled: state.packages.total
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setPackages: (packages) => dispatch(packagesActions.setPackages(packages)),
		setPackageActions: (actions) => dispatch(packagesActions.setPackageActions(actions)),
		setPackageJSON: (content) => dispatch(globalActions.setPackageJSON(content)),
		setActive: (pkg) => dispatch(packagesActions.setActive(pkg)),
		toggleLoader: (bool) => dispatch(globalActions.toggleLoader(bool)),
		toggleModal: (bool) => dispatch(globalActions.toggleModal(bool)),
		toggleMainLoader: (bool) => dispatch(packagesActions.toggleMainLoader(bool)),
		setMode: (mode) => dispatch(globalActions.setMode(mode)),
		setPackagesOutdated: (packages) => dispatch(packagesActions.setPackagesOutdated(packages)),
		setTotalInstalled: (total) => dispatch(packagesActions.setTotalInstalled(total)),
		addMessage: (level, message) => dispatch(globalActions.addMessage(level, message)),
		clearMessages: () => dispatch(globalActions.clearMessages())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesContainer)
