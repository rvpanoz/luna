import React from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'
import Checkbox from 'material-ui/Checkbox'

const styles = (theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
})

const ListView = (props) => {
	return (
		<List>
			<ListItem button>
				<ListItemIcon />
				<ListItemText primary="Inbox" />
			</ListItem>
		</List>
	)
}

export default withStyles(styles)(ListView)
