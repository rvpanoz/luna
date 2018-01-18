/**
 * APP constants
 **/

//app modes
export const APP_MODES = {
	GLOBAL: 'GLOBAL',
	LOCAL: 'LOCAL'
}

//package actions
export const APP_ACTIONS = {
	INSTALL: 'INSTALL',
	UPDATE: 'UPDATE',
	UNINSTALL: 'UNINSTALL'
}

export const QUICKMENU = {
	ICONS: ['fa-bars', 'fa-feed', 'fa-cog']
}

//package groups (in package.json)
export const PACKAGE_GROUPS = ['dependencies', 'devDependencies', 'optionalDependencies']

//command options when perfoming an APP action
export const COMMAND_OPTIONS = [
	'save*Package will appear in your dependencies',
	'save-dev*Package will appear in your devDependencies',
	"save-exact*Saved dependencies will be configured with an exact version rather than using npm's default semver range operator",
	'save-optional*Saved dependencies will also be added to your bundleDependencies list'
]

//modal custom styles
//https://github.com/reactjs/react-modal#demos
export const AppModalStyles = {
	content: {
		width: '45%',
		height: '375px',
		top: '220px',
		left: '500px'
	}
}
