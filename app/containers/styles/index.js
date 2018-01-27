export function layoutStyles(theme) {
	const drawerWidth = 240
	return {
		root: {
			width: '100%',
			height: '100%',
			zIndex: 1,
			overflow: 'hidden'
		},
		appFrame: {
			position: 'relative',
			display: 'flex',
			width: '100%',
			height: '100%'
		},
		appBar: {
			position: 'absolute',
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
		content: {
			width: '100%',
			flexGrow: 1,
			backgroundColor: theme.palette.background.default,
			padding: 24,
			marginLeft: 50,
			height: 'calc(100% - 56px)',
			marginTop: 56,
			[theme.breakpoints.up('sm')]: {
				height: 'calc(100% - 64px)',
				marginTop: 64
			}
		}
	}
}
