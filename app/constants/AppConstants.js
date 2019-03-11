/**
 * APP constants
 * */

const APP_NAME = 'Luna';
const APP_MANAGER = 'npm';

export const GITHUB = {
  baseUrl: 'https://api.github.com/repos/'
};

export const APP_GLOBALS = {
  name: APP_NAME,
  manager: APP_MANAGER
};

// app modes
export const APP_MODES = {
  global: 'global',
  local: 'local'
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

export const PACKAGE_GROUPS = {
  dependencies: 'save-prod',
  devDependencies: 'save-dev',
  optionalDependencies: 'save-optional',
  bundleDependencies: 'save-bundle',
  peerDependencies: 'save-peer',
  noSave: 'no-save'
};

export const COMMAND_OPTIONS = [
  'save-prod*Package will appear in your dependencies',
  'save-dev*Package will appear in your devDependencies',
  'save-optional*Package will appear in your optionalDependencies',
  "save-exact*Saved dependencies will be configured with an exact version rather than using npm's default semver range operator"
];

export const ERROR_TYPES = ['WARN', 'ERR'];

export const NPM_CONFIG_VALUES = {
  REGISTRY: 'registry',
  PROXY: 'proxy',
  HTTPS_PROXY: 'https-proxy'
};

export const INFO_MESSAGES = {
  loading: 'Loading packages..',
  noData: 'No dependencies found.',
  loaded: 'Package loaded.',
  updating: 'Please wait. Updating packages',
  installing: 'Please choose installation options'
};

export const WARNING_MESSAGES = {
  peerMissing:
    'You have packages with peer missing. Check your notifications to fix it.',
  errorPackages:
    'Some packages have errors. Check your notifications to fix it.',
  yarnlock:
    'yarn-lock file detected. Please remove it before running any action operation',
  newerSelected: 'A newer package with the same name is already selected'
};
