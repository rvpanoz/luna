/**
 * APP constants
 * */

const APP = 'LUNA';
const NPM = 'npm';

export const GITHUB = {
  baseUrl: 'https://api.github.com/repos/'
};

export const APP_GLOBALS = {
  name: APP,
  manager: NPM
};

// app modes
export const APP_MODES = {
  GLOBAL: 'GLOBAL',
  LOCAL: 'LOCAL'
};

export const APP_INFO = {
  CONFIRMATION: 'Would you like to $action $name@version?',
  NOT_AVAILABLE: 'N/A',
  NO_NOTIFICATIONS: 'No notifications',
  NO_WORKING_DIRECTORY: 'No working directory',
  NO_DATA: 'No data'
};

// package actions
export const APP_ACTIONS = ['install', 'uninstall', 'update', 'view'];

// supported package groups
export const PACKAGE_GROUPS = {
  dependencies: 'save',
  devDependencies: 'save-dev',
  optionalDependencies: 'save-optional',
  bundleDependencies: 'save-bundle'
};

// command options when perfoming an APP action
export const COMMAND_OPTIONS = [
  'save*Package will appear in your dependencies',
  'save-dev*Package will appear in your devDependencies',
  'save-optional*Package will appear in your optionalDependencies',
  "save-exact*Saved dependencies will be configured with an exact version rather than using npm's default semver range operator"
];

// npm config allowed values
export const NPM_CONFIG_VALUES = {
  REGISTRY: 'registry',
  PROXY: 'proxy',
  HTTPS_PROXY: 'https-proxy'
};

export const INFO_MESSAGES = {
  noData: 'No dependencies found.',
  packageLoaded: 'Package loaded.'
};

export const WARNING_MESSAGES = {
  peerMissing:
    'You have packages with peer missing. Check your notifications to fix it.',
  errorPackages:
    'Some packages have errors. Check your notifications to fix it.',
  yarnlock:
    'yarn-lock file detected. Please remove before running any action operation.'
};
