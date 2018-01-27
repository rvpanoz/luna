export function layoutStyles(theme) {
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
