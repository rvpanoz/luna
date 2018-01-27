export function appHeaderStyles(theme) {
	const drawerWidth = 240
	return {
		appBar: {
			position: 'fixed',
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			})
		},
		appBarShift: {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen
			})
		},
		drawerInner: {
			// Make the items inside not wrap when transitioning:
			width: drawerWidth
		},
		drawerHeader: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			padding: '0 8px',
			...theme.mixins.toolbar
		},
		drawerPaperClose: {
			width: 60,
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			})
		},
		menuButton: {
			marginLeft: 12,
			marginRight: 36
		},
		hide: {
			display: 'none'
		}
	}
}

export function appHeaderContentStyles(theme) {
	return {
		iconHover: {
			'&:hover': {
				fill: pink[200]
			}
		}
	}
}
