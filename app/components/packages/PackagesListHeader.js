import React from 'react'
import { remote, ipcRenderer } from 'electron'
import { APP_MODES } from '../../constants/AppConstants'
import styles from './Packages.css'

class PackagesListHeader extends React.Component {
	constructor(props) {
		super(props)
		this.loadData = this.loadData.bind(this)
		this.setGlobalMode = this.setGlobalMode.bind(this)
	}
	loadData(e) {
		e.preventDefault()
		this.props.loadData()
		return false
	}
	setGlobalMode(e) {
		e.preventDefault()
		if (this.props.mode === APP_MODES.GLOBAL) {
			return
		}
		this.props.toggleLoader(true)
		this.props.setMode(APP_MODES.GLOBAL, null)
		this.props.setActive(null)
		this.props.setPackageActions()
		ipcRenderer.send('ipc-event', {
			ipcEvent: 'get-packages',
			cmd: ['list', 'outdated'],
			mode: APP_MODES.GLOBAL
		})
	}
	render() {
		let props = this.props
		return (
			<div style={{ marginBottom: '15px' }}>
				<div className={styles.packages__head}>
					<div className={styles.packages__title}>
						<span>Packages&nbsp;</span>
						<span
							className="label"
							style={{
								display: 'inline-block',
								minWidth: '45px',
								color: '#fff'
							}}
						>
							{props.total}
						</span>
					</div>
					<div className={styles.packages__actions}>
						<div className={styles.packages__action}>
							<i className="fa fa-fw fa-refresh" onClick={this.loadData} title="Reload" />
						</div>
						<div className={`${styles.packages__action} dropdown`}>
							<i className="fa fa-fw fa-cog dropdown-toggle" data-toggle="dropdown" />
							<ul className="dropdown-menu dropdown-menu-right">
								<li className="dropdown-header">Actions</li>
								<li>
									<a href="#" onClick={this.setGlobalMode}>
										<i className="fa fa-fw fa-reply" />&nbsp;
										<span>Switch to global mode</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className={styles.packages__mode}>
					<div className="mode">
						<span className="label label-info">{props.mode}</span>
					</div>
					<div className="directory">
						<span className={styles.directory}>{props.directory}</span>
					</div>
				</div>
			</div>
		)
	}
}

export default PackagesListHeader
