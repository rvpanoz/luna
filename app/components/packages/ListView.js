import React from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

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

export default ListView
