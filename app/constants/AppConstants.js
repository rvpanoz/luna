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

export const APP_MODES = {
  global: 'global',
  local: 'local'
};

export const DEFAULT_MODE = 'Global mode';
export const DEFAULT_VERSION = '1.0.0';
export const ERROR_TYPES = ['WARN', 'ERR'];
export const FATAL_ERROR = 'Fatal error. Please try again';

export const APP_INFO = {
  CONFIRMATION: 'Are you sure?',
  NOT_AVAILABLE: 'N/A',
  NO_NOTIFICATIONS: 'No notifications',
  NO_WORKING_DIRECTORY: 'No working directory',
  NO_DATA: 'No data'
};

export const APP_ACTIONS = ['install', 'uninstall', 'update', 'view'];
export const APP_TOOLS = ['audit', 'doctor', 'prune', 'lockVerify', 'init'];
export const APP_SETTINGS = ['verify', 'clean'];

export const PACKAGE_GROUPS = {
  dependencies: 'save-prod',
  devDependencies: 'save-dev',
  optionalDependencies: 'save-optional',
  noSave: 'no-save',
  saveExact: 'save-exact'
};

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
  installing: 'Please choose installation options',
  fixOptions: 'Please choose fix options',
  extraneous:
    'Found extraneous packages. Run npm prune from the Tools tab to fix them.'
};

export const WARNING_MESSAGES = {
  peerMissing:
    'You have packages with peer missing. Check your notifications to fix it.',
  errorPackages:
    'Some packages have errors. Check your notifications to fix it.',
  yarnlock:
    'yarn-lock file detected. Please remove it before running any action operation',
  newerSelected:
    'A package with the same name and newer version is already selected',
  oldorEqualSelected:
    'A package with the same name and same or lower version is already selected'
};
