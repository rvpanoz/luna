/**
 * Package container
 * */

import { remote, ipcRenderer } from 'electron'
import React from 'react'
import Loader from '../common/Loader'
import { showMessageBox, isUrl } from '../utils'
import { APP_MODES, APP_ACTIONS, PACKAGE_GROUPS } from 'constants/AppConstants'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { bindActionCreators } from 'redux'
import * as globalActions from 'actions/global_actions'
import * as packagesActions from 'actions/packages_actions'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import classnames from 'classnames'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import { packageStyles } from './styles'

class Package extends React.Component {
	constructor() {
		super()
		this._group = null
		this.doNavigate = this.doNavigate.bind(this)
		this.doAction = this.doAction.bind(this)
		this.onChangeVersion = this.onChangeVersion.bind(this)
	}
	doAction(e) {
		e.preventDefault()
		const target = e.currentTarget
		const action = target.dataset.action
		const { mode, active, setActive, toggleModal } = this.props
		const options = this.props.cmdOptions

		if (action) {
			const selectVersion = this.refs.selectVersion
			let version

			if (action === APP_ACTIONS.UNINSTALL) {
				version = null
			} else {
				version = selectVersion && selectVersion.value !== 'false' ? selectVersion.value : 'latest'
			}

			showMessageBox(
				{
					action,
					name: active.name,
					version
				},
				() => {
					const npmCmd = [`npm ${action.toLowerCase()} `, active.name]
					if (mode === APP_MODES.LOCAL) {
						npmCmd.push(` --${options.join(' --')}`)
					}
					setActive(null)
					toggleModal(true, npmCmd)
					ipcRenderer.send('ipc-event', {
						mode,
						directory,
						ipcEvent: action,
						cmd: [action === 'Uninstall' ? 'uninstall' : 'install'],
						pkgName: active.name,
						pkgVersion: action === 'Uninstall' ? null : version,
						pkgOptions: options
					})
				}
			)
		}
		return false
	}
	onChangeVersion(e) {
		const target = e.currentTarget
		const pkg = this.props.active
		const version = target.value

		if (version !== 'false') {
			this.props.toggleMainLoader(true)
			ipcRenderer.send('ipc-event', {
				mode: this.props.mode,
				directory: this.props.directory,
				ipcEvent: 'view-package',
				cmd: ['view'],
				pkgName: pkg.name,
				pkgVersion: version
			})
		}
		return false
	}
	componentDidUpdate() {
		const { mode, packageJSON } = this.props

		if (mode === APP_MODES.LOCAL) {
			if (!packageJSON) {
				throw new Error('PackageJSON is missing')
			}

			const pkg = this.props.active
			if (!pkg) {
				return
			}
			let found = false

			const groups = PACKAGE_GROUPS.some((group, idx) => {
				found = packageJSON[group] && packageJSON[group][pkg.name] ? group : false
				if (found) {
					this._group = group
					return true
				}
			})
		}
	}
	doNavigate(e) {
		e.preventDefault()
		const url = e.target.dataset.url
		if (isUrl(url)) {
			shell.openExternal(url)
		}
		return false
	}
	render() {
		const { mode, active, isLoading, classes } = this.props

		if (!active) {
			return (
				<Loader loading={isLoading}>
					<div
						style={{
							width: '100%',
							display: 'block',
							position: 'relative'
						}}
					>
						<h3 className={classnames(classes.heading, classes.center)}>No package selected</h3>
					</div>
				</Loader>
			)
		}

		return (
			<Loader loading={isLoading}>
				<div ref="rootEl">
					<h3 className={classes.heading}>{active.name}</h3>
					<Divider />
					<Card className={classes.card}>
						<CardHeader
							avatar={
								<Avatar aria-label="Recipe" className={classes.avatar}>
									P
								</Avatar>
							}
							action={
								<IconButton>
									<MoreVertIcon />
								</IconButton>
							}
							title={this._group}
							subheader={active.version}
						/>
					</Card>
				</div>
			</Loader>
		)
	}
}

// const _PackageContainer = (props) => {
// 	function _closeModal() {
// 		props.toggleModal(false, '')
// 		return false
// 	}
//
// 	return (
// 		<div className="package-container">
// 			<PackageDetails
// 				mode={props.mode}
// 				directory={props.directory}
// 				active={props.active}
// 				actions={props.actions}
// 				setActive={props.setActive}
// 				toggleMainLoader={props.toggleMainLoader}
// 				toggleModal={props.toggleModal}
// 				packageJSON={props.packageJSON}
// 				isLoading={props.isLoading}
// 				cmdOptions={props.cmdOptions}
// 				addCommandOption={props.addCommandOption}
// 				clearCommandOptions={props.clearCommandOptions}
// 			/>
// 		</div>
// 	)
// }

function mapStateToProps(state) {
	return {
		mode: state.global.mode,
		directory: state.global.directory,
		packageJSON: state.global.packageJSON,
		cmdOptions: state.global.cmdOptions,
		actions: state.packages.actions,
		active: state.packages.active,
		isLoading: state.packages.isLoading,
		toggleModal: state.global.toggleModal,
		showModal: state.global.showModal,
		npmCmd: state.global.npmCmd
	}
}

function mapDispatchToProps(dispatch) {
	return {
		addCommandOption: (option) => dispatch(globalActions.addCommandOption(option)),
		clearCommandOptions: () => dispatch(globalActions.clearCommandOptions()),
		toggleMainLoader: (bool) => dispatch(packagesActions.toggleMainLoader(bool)),
		setActive: (pkg) => dispatch(packagesActions.setActive(pkg)),
		toggleModal: (bool, npmCmd) => dispatch(globalActions.toggleModal(bool, npmCmd))
	}
}

export default compose(withStyles(packageStyles, { withTheme: true }), connect(mapStateToProps, mapDispatchToProps))(
	Package
)
