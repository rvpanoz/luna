import { remote, ipcRenderer } from 'electron'
import React from 'react'
import styles from './Packages.css'

class PackageItem extends React.Component {
	constructor(props) {
		super(props)
		this._needsUpdates = true
		this.onItemClick = this.onItemClick.bind(this)
	}
	onItemClick(e) {
		e.preventDefault()
		let el = this.refs[`root-${this.props.idx}`]
		let isSelected = el.classList.contains('selected')
		if (!isSelected) {
			this.props.deselectAll()
			this.props.toggleMainLoader(true)
			el.classList.add('selected')
			ipcRenderer.send('ipc-event', {
				ipcEvent: 'view-package',
				cmd: ['view'],
				pkgName: this.props.name,
				pkgVersion: this.props.version,
				mode: this.props.mode,
				directory: this.props.directory
			})
		}
		return false
	}
	render() {
		let props = this.props
		if (!props.name) {
			return null
		}
		return (
			<div ref={`root-${this.props.idx}`} className={styles.packages__item} onClick={this.onItemClick}>
				<div className={styles.packages__item__head}>
					<div className={styles.packages__item__name}>
						<span>{props.name}&nbsp;</span>
						<span style={{ float: 'right', color: '#fff' }} className="label label-danger">
							{props.version}
						</span>
					</div>
				</div>
			</div>
		)
	}
}

export default PackageItem
