export const APP_MODES = {
  GLOBAL: 'GLOBAL',
  LOCAL: 'LOCAL'
}

export const PACKAGE_GROUPS = ['dependencies', 'devDependencies', 'optionalDependencies'];

export const COMMAND_OPTIONS = [
  'save*Package will appear in your dependencies',
  'save-dev*Package will appear in your devDependencies',
  'save-exact*Saved dependencies will be configured with an exact version rather than using npm\'s default semver range operator',
  'save-optional*Saved dependencies will also be added to your bundleDependencies list'
];
