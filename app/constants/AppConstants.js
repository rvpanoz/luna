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

export const AUDIT_TYPES = {
  REDOS: 'Regular Expression Denial of Service',
  DOS: 'Denial of Service',
  PP: 'Prototype Pollution',
  AFO: 'Arbitrary File Overwrite',
  CI: 'Code Injection',
  UAF: 'Use-After-Free',
  RMD: 'Remote Memory Disclosure',
  DOSWS: 'DoS due to excessively large websocket message',
  CINJ: 'Command Injection',
  CRWP: 'Cryptographically Weak PRNG',
  OFBR: 'Out-of-bounds Read',
  NA: 'Not Available'
}
