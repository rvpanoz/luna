import { remote, ipcRenderer } from 'electron'
import React from 'react'
import { withStyles } from 'material-ui/styles'
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'

class PackageListItem extends React.Component {
	constructor(props) {
		super(props)
		this._needsUpdates = true
		this.onItemClick = this.onItemClick.bind(this)
	}
	onItemClick(e) {
		const { name, version, mode, directory } = this.props
		e.preventDefault()
		this.props.toggleMainLoader(true)
		ipcRenderer.send('ipc-event', {
			ipcEvent: 'view-package',
			cmd: ['view'],
			pkgName: this.props.name,
			pkgVersion: this.props.version,
			mode,
			directory
		})
		return false
	}
	render() {
		const { name, version } = this.props
		const { classes } = this.props
		if (!name) {
			return null
		}
		return (
			<ListItem button>
				<ListItemText primary={name} secondary={version} />
				<ListItemSecondaryAction>
					<IconButton aria-label="Delete">delete</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		)
	}
}

// <div ref={`root-${this.props.idx}`} className={styles.packages__item} onClick={this.onItemClick}>
// 	<div className={styles.packages__item__head}>
// 		<div className={styles.packages__item__name}>
// 			<span>{props.name}&nbsp;</span>
// 			<span style={{ float: 'right', color: '#fff' }} className="label label-danger">
// 				{props.version}
// 			</span>
// 		</div>
// 	</div>
// </div>
export default withStyles()(PackageListItem)
