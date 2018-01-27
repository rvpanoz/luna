import React from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Icon from 'material-ui/Icon'
import { withStyles } from 'material-ui/styles'
import pink from 'material-ui/colors/pink'
import { appHeaderContentStyles } from './styles'

const AppHeaderContent = (props) => {
	const { classes } = props

	return (
		<List>
			<ListItem button>
				<ListItemIcon>
					<Icon className={classes.iconHover}>send</Icon>
				</ListItemIcon>
				<ListItemText primary="Analyze" secondary="Open package.json" />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<Icon>list</Icon>
				</ListItemIcon>
				<ListItemText primary="Outdated" secondary="Outdated packages" />
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<Icon>settings</Icon>
				</ListItemIcon>
				<ListItemText primary="Settings" secondary="Application settings" />
			</ListItem>
		</List>
	)
}

export default withStyles(appHeaderContentStyles)(AppHeaderContent)
